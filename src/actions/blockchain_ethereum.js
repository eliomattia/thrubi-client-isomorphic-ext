import Web3 from "web3";
import {logout} from "./auth";
import {emitFlare} from "./flare";
import {ethEventType} from "../config/blockchain_ethereum";
import actionType from "../config/actionTypes";
import flareBook from "../config/flare";
import {THRUBI_ABI,THRUBI_ADDRESS} from "../env/blockchain_ethereum";
import {INTERVAL_ETH_ADDRESS_WORKER, INTERVAL_ETH_NETWORK_WORKER} from "../env/workers";

export const signMessage = hash => async (dispatch,getState) =>  {
    const web3 = new Web3(Web3.givenProvider);
    const ethAddress = getState().client.userAccess.ethAddress;
    return await web3.eth.personal.sign(hash,ethAddress,null);
};

export const enableBlockchain = () => async (dispatch,getState) => {
    // Extract injected Web3
    const web3 = new Web3(Web3.givenProvider);
    // Generate contract
    const thrubiContract = new web3.eth.Contract(THRUBI_ABI,THRUBI_ADDRESS);
    dispatch({type:actionType.RECEIVE_THRUBI_CONTRACT,payload:{thrubiContract}});
    // Fetch network type
    const ethNetworkWorker = setInterval(() => {
        web3.eth.net.getNetworkType()
            .then(ethNetwork    => ({ethNetwork,changed:ethNetwork !== getState().client.userAccess.ethNetwork}))
            .then(result        => {if (result.changed) dispatch({type:actionType.UPDATE_ETH_NETWORK,payload:{ethNetwork:result.ethNetwork}}); return result;});
            //.then(result        => {if (result.changed) dispatch(emitFlare(flareBook.flareType.INFO,flareBook.infoFlare.DETECTED_ETH_NETWORK_CHANGE));});
    },INTERVAL_ETH_NETWORK_WORKER);
    dispatch({type:actionType.RECEIVE_ETH_NETWORK_WORKER,payload:{ethNetworkWorker}});
    // Enable MetaMask and fetch account, then login with blockchain
    const ethAddressWorker = setInterval(() => {
        window.ethereum.enable()
            .then (()           => web3.eth.getAccounts())
            .catch(error        => dispatch(emitFlare(flareBook.flareType.ERROR,flareBook.errorFlare.CANNOT_ENABLE_ETHEREUM)))
            .then (accounts     => accounts[0])
            .then (ethAddress   => ({ethAddress,changed:ethAddress !== getState().client.userAccess.ethAddress}))
            .then (result       => {if (result.changed) dispatch(logout({autoLogin:false})); return result;})
            .then (result       => {if (result.changed) dispatch({type:actionType.UPDATE_ETH_ADDRESS,payload:{ethAddress:result.ethAddress}}); return result;});
            //.then (result       => {if (result.changed) dispatch(emitFlare(flareBook.flareType.INFO,flareBook.infoFlare.DETECTED_ETH_ADDRESS_CHANGE))});
    },INTERVAL_ETH_ADDRESS_WORKER);
    dispatch({type:actionType.RECEIVE_ETH_ADDRESS_WORKER,payload:{ethAddressWorker}});
};

export const transform = transformEth => (dispatch,getState) => {
    const transformContract = getState().session.blockchain.thrubiContract.methods.transform;
    const ethAddress = getState().client.userAccess.ethAddress;
    const populationId = getState().client.population.id;
    const userId = getState().client.user.id;
    return new Promise((resolve,reject) => {
        try {
            transformContract(userId,populationId,ethAddress)
                .send({from:ethAddress,value:transformEth*1e18})
                .once(ethEventType.confirmation,() => {
                        // Thrubi will automatically process the transform via its workers on the backend
                        resolve();
                    }
                );
        } catch (error) {
            throw flareBook.errorFlare.NO_ETHEREUM_CONFIG;
        }
    });
};


