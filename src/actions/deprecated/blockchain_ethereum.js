
// the following are functions that are not currently being used


/*this.props.ethThrubiContract.methods.createUser(this.props.ethAddress)
    .send({from: this.props.ethAddress})
    .once("confirmation", async () => {
            console.log("Received!");
        }
    );*/


/*
this.props.ethThrubiContract.methods.updateUser(this.props.ethAddress,_name,_surname)
    .send({from: this.props.ethAddress})
    .once("confirmation", async () => {
            console.log("Received!");
            await this.reload();
        }
    );
    */

/*
const fetchUser = async () => {
    //Fetch user
    console.log("Before findMe");
    const userFound = await this.props.ethThrubiContract.methods.findMe(this.props.ethAddress).call({from: this.props.ethAddress});
    console.log("After findMe");
    this.setState({userFound});
    console.log("userFound: ",userFound);
    if (userFound) {
        const userData = await this.props.ethThrubiContract.methods.findMyUser(this.props.ethAddress).call({from: this.props.ethAddress});
        console.log("userData: ",userData);
        this.setState({userName: userData.name});
        this.setState({userSurname: userData.surname});
        this.setState({userDeactivated: userData.deactivated});
    }
};

const createUser = async (_name,_surname) => {
    this.setState({userBusy: true});
    this.props.ethThrubiContract.methods.createUser(this.props.ethAddress,_name,_surname)
        .send({from: this.props.ethAddress})
        .once("confirmation", async () => {
                console.log("Received!");
                await this.reload();
            }
        );
};

const updateUser = async (_name,_surname) => {
    this.setState({userBusy: true});
    this.props.ethThrubiContract.methods.updateUser(this.props.ethAddress,_name,_surname)
        .send({from: this.props.ethAddress})
        .once("confirmation", async () => {
                console.log("Received!");
                await this.reload();
            }
        );
};
*/