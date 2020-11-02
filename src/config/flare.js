import {AMAZON_S3_MAX_PICTURE_SIZE} from "./s3";

const flareBook = {
    flareType: {
        ERROR:      "ERROR",
        WARNING:    "WARNING",
        INFO:       "INFO",
    },
    flareFallback: (flare,fallback) => {
        if (flare && flare.thrubiFlareId) {
            return flare;
        } else {
            fallback.details=flare;
            return fallback;
        }
    },
    infoFlare: {
        THANK_YOU:                  {thrubiFlareId:"I_TY",message:"Thank you!"},
        CANNOT_SUBSCRIBE_NEWSLETTER:{thrubiFlareId:"I015",message:"Could not subscribe you to the newsletter, please try again"},
        CANNOT_TOGGLE_FAQ_STATE:    {thrubiFlareId:"I016",message:"Something went wrong with toggling the content"},
        DETECTED_ETH_NETWORK_CHANGE:{thrubiFlareId:"I001",message:"Detected Ethereum network change"},
        DETECTED_ETH_ADDRESS_CHANGE:{thrubiFlareId:"I002",message:"Detected Ethereum address change"},
        DEACTIVATED_ON:             {thrubiFlareId:"I003",message:"User account is deactivated"},
        DEACTIVATED_OFF:            {thrubiFlareId:"I004",message:"User account is now active"},
        DEACTIVATED_PENDING:        {thrubiFlareId:"I005",message:"User account is now pending activation"},
        EMAIL_VERIFIED_ON:          {thrubiFlareId:"I006",message:"Email address has been verified"},
        EMAIL_VERIFIED_OFF:         {thrubiFlareId:"I007",message:"Unverified email address detected. Please check your inbox."},
        EMAIL_VERIFIED_PENDING:     {thrubiFlareId:"I008",message:"Email address pending verification. Please check your inbox."},
        IDENTITY_CERTIFIED_ON:      {thrubiFlareId:"I009",message:"Identity document certified"},
        IDENTITY_CERTIFIED_OFF:     {thrubiFlareId:"I010",message:"Non-certified identity document detected. Please certify."},
        IDENTITY_CERTIFIED_PENDING: {thrubiFlareId:"I011",message:"Identity certification procedure pending. Please wait."},
        INCOME_APPROVED_ON:         {thrubiFlareId:"I012",message:"Declared income has been officially approved"},
        INCOME_APPROVED_OFF:        {thrubiFlareId:"I013",message:"Newly declared income is not approved, please check."},
        INCOME_APPROVED_PENDING:    {thrubiFlareId:"I014",message:"Newly declared income is pending approval. Please wait."},
    },
    errorFlare: {
        USER_ACTIVATION:            {thrubiFlareId:"0021",message:"User activation module error"},
        UNEXPECTED_FLARE:           {thrubiFlareId:"0009",message:"Flares must have an ID to be dispatched"},
        THRUBI_SERVER_ERROR:        {thrubiFlareId:"0001",message:"Thrubi server returned an error"},
        THRUBI_CONNECTION_FAILED:   {thrubiFlareId:"0002",message:"Thrubi server not available, please check your connection"},
        FAILED_LOGOUT:              {thrubiFlareId:"0003",message:"Unable to logout"},
        FAILED_LOGIN:               {thrubiFlareId:"0008",message:"Login failed"},
        EXRATE_FETCH_ERROR:         {thrubiFlareId:"0010",message:"Failed fetching exchange rate from Coinbase server"},
        FB_NOT_FOUND:               {thrubiFlareId:"0004",message:"Unable to connect to Facebook"},
        ERR_FETCH_GLOBAL_STATS:     {thrubiFlareId:"0011",message:"Error while receiving global stats"},
        ERR_RECEIVE_GLOBAL_STATS:   {thrubiFlareId:"0012",message:"Error while processing global stats"},
        NO_ETHEREUM_CONFIG:         {thrubiFlareId:"0022",message:"Ethereum wallet not found, please configure or enable MetaMask"},
        CANNOT_ENABLE_ETHEREUM:     {thrubiFlareId:"0013",message:"Could not enable Ethereum"},
        ERR_USER_DETAILS:           {thrubiFlareId:"0014",message:"Error processing user details"},
        ERR_USER_PROFILE_PICTURE:   {thrubiFlareId:"0023",message:"Please upload a JPG or PNG file, max size: "+((AMAZON_S3_MAX_PICTURE_SIZE/1000).toFixed(0))+" kB"},
        S3_UPLOAD_ERROR:            {thrubiFlareId:"0024",message:"Could not upload picture to Amazon S3"},
        ERR_ACCOUNT_CLOSE:          {thrubiFlareId:"0015",message:"Could not close user account"},
        ERR_GENERIC_USERMENU:       {thrubiFlareId:"0016",message:"Internal: error with an user menu operation"},
        ERR_PAY_CHANNEL_UPDATE:     {thrubiFlareId:"0017",message:"Error updating user pay channel"},
        ERR_RECEIVE_CHANNEL_UPDATE: {thrubiFlareId:"0023",message:"Error updating user receive channel"},
        ERR_USER_CHANNEL_FETCH:     {thrubiFlareId:"0018",message:"Error fetching user channels"},
        ERR_CHANNEL_FETCH:          {thrubiFlareId:"0019",message:"Error fetching channels"},
        ERR_USER_FLAGS:             {thrubiFlareId:"0020",message:"Could not update user flags"},
        CHANNEL_CLOSED:             {thrubiFlareId:"0005",message:"Switching to Add Channel page, channel is not open"},
        MESSAGE_IGNORED:            {thrubiFlareId:"0006",message:"Internal: message from login popup ignored"},
        ERROR_STOP_TOKEN_REFRESH:   {thrubiFlareId:"0007",message:"Internal: error stopping token refresh"},
    },
};

export default flareBook;

export const TIMEOUT_FLARE_DELETE = 7000;
export const TIMEOUT_FLARE_DELETE_LONG = 30000;