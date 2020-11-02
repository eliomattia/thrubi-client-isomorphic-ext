import {routeParams} from "../config/routes/routes";

class Channel {
    static channelIsOpen          (channelMode) {return channelMode>0;}
    static channelIsForLogin      (channelMode) {return  Math.abs(channelMode)     %2;} //last bit
    static channelIsForPay        (channelMode) {return (Math.abs(channelMode)>>1) %2;} //second-to-last bit

    static channelName = {
        NOT_AVAILABLE:          "N/A",
        BLOCKCHAIN_ETHEREUM:    "BLOCKCHAIN_ETHEREUM",
        KEYBOARD:               "KEYBOARD",
        FACEBOOK:               "FACEBOOK",
        LINKEDIN:               "LINKEDIN",
        GOOGLE:                 "GOOGLE",
        PAYPAL:                 "PAYPAL",
        TWITTER:                "TWITTER",
        PATREON:                "PATREON",
        DISCORD:                "DISCORD",
        EMAIL:                  "EMAIL",
};
    
    static channelColor(channelName) {
        switch (channelName) {
            case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "blockchain-ethereum";
            case Channel.channelName.KEYBOARD:              return "keyboard";
            case Channel.channelName.FACEBOOK:              return "facebook";
            case Channel.channelName.LINKEDIN:              return "linkedin";
            case Channel.channelName.GOOGLE:                return "google";
            case Channel.channelName.PAYPAL:                return "paypal";
            case Channel.channelName.TWITTER:               return "twitter";
            case Channel.channelName.PATREON:               return "patreon";
            case Channel.channelName.DISCORD:               return "discord";
            default:                                        return "";
        }
    }

    static channelAuthFunctionName(channelName) {
        switch (channelName) {
            case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "BlockchainEthereum";
            case Channel.channelName.KEYBOARD:              return "Keyboard";
            case Channel.channelName.FACEBOOK:              return "Facebook";
            case Channel.channelName.LINKEDIN:              return "LinkedIn";
            case Channel.channelName.GOOGLE:                return "Google";
            case Channel.channelName.PAYPAL:                return "PayPal";
            case Channel.channelName.TWITTER:               return "Twitter";
            default:                                        return "";
        }
    }

    static channelUserFriendlyName(channelName,actionType) {
        switch (actionType) {
            case "USE": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Use my Ethereum wallet";
                case Channel.channelName.PAYPAL:                return "Use my PayPal account";
                default:                                        return "";
            }
            case "USING": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Using my Ethereum wallet";
                case Channel.channelName.PAYPAL:                return "Using my PayPal account";
                default:                                        return "";
            }
            case "LINK": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Connect an Ethereum wallet to use it";
                case Channel.channelName.PAYPAL:                return "Connect a PayPal account to use it";
                default:                                        return "";
            }
            case routeParams.LOGIN_SIGNUP.values.LOGIN: switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Login with Ethereum wallet";
                case Channel.channelName.KEYBOARD:              return "Login with credentials";
                case Channel.channelName.FACEBOOK:              return "Login with Facebook";
                case Channel.channelName.LINKEDIN:              return "Login with LinkedIn";
                case Channel.channelName.GOOGLE:                return "Login with Google";
                case Channel.channelName.TWITTER:               return "Login with Twitter";
                default:                                        return "";
            }
            case routeParams.LOGIN_SIGNUP.values.SIGNUP: switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Sign up with Ethereum wallet";
                case Channel.channelName.KEYBOARD:              return "Sign up with credentials";
                case Channel.channelName.FACEBOOK:              return "Sign up with Facebook";
                case Channel.channelName.LINKEDIN:              return "Sign up with LinkedIn";
                case Channel.channelName.GOOGLE:                return "Sign up with Google";
                case Channel.channelName.TWITTER:               return "Sign up with Twitter";
                default:                                        return "";
            }
            case "ADD": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Connect an Ethereum wallet";
                case Channel.channelName.KEYBOARD:              return "Add credentials";
                case Channel.channelName.FACEBOOK:              return "Connect a Facebook account";
                case Channel.channelName.LINKEDIN:              return "Connect a LinkedIn account";
                case Channel.channelName.GOOGLE:                return "Connect a Google account";
                case Channel.channelName.PAYPAL:                return "Connect a PayPal account";
                case Channel.channelName.TWITTER:               return "Connect a Twitter account";
                default:                                        return "";
            }
            case "DELETE": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Disconnect my Ethereum wallet";
                case Channel.channelName.KEYBOARD:              return "Delete my credentials";
                case Channel.channelName.FACEBOOK:              return "Disconnect my Facebook account";
                case Channel.channelName.LINKEDIN:              return "Disconnect my LinkedIn account";
                case Channel.channelName.GOOGLE:                return "Disconnect my Google account";
                case Channel.channelName.PAYPAL:                return "Disconnect my PayPal account";
                case Channel.channelName.TWITTER:               return "Disconnect my Twitter account";
                default:                                        return "";
            }
            case "UPDATE": switch (channelName) {
                case Channel.channelName.BLOCKCHAIN_ETHEREUM:   return "Connect another Ethereum wallet";
                case Channel.channelName.KEYBOARD:              return "Update my credentials";
                case Channel.channelName.FACEBOOK:              return "Connect another Facebook account";
                case Channel.channelName.LINKEDIN:              return "Connect another LinkedIn account";
                case Channel.channelName.GOOGLE:                return "Connect another Google account";
                case Channel.channelName.PAYPAL:                return "Connect another PayPal account";
                case Channel.channelName.TWITTER:               return "Connect another Twitter account";
                default:                                        return "";
            }
            default: return "";
        }
    }
}

export default Channel;