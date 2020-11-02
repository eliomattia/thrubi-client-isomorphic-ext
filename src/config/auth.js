// --------
// LinkedIn
// --------
const linkedInScope = "r_liteprofile%20r_emailaddress";
export const linkedInAuthUri =  (linkedInRedirectUri,linkedInAppState,linkedInAppClientId) =>
                                "https://www.linkedin.com/oauth/v2/authorization?" +
                                "response_type=code" +
                                "&redirect_uri="+linkedInRedirectUri+
                                "&state="+linkedInAppState+
                                "&scope="+linkedInScope+
                                "&client_id="+linkedInAppClientId;

export const linkedInWindowName = "Login to Thrubi using your LinkedIn account";
export const linkedInWindowParams = "toolbar=no, menubar=no, width=600, height=500, top=50, left=100";

// ------
// Google
// ------
const googleScope = "email%20profile";
export const googleAuthUri =    (googleRedirectUri,googleAppClientId) =>
                                "https://accounts.google.com/o/oauth2/auth?"+
                                "response_type=code" +
                                "&redirect_uri="+googleRedirectUri+
                                "&scope="+googleScope+
                                "&client_id="+googleAppClientId;

export const googleWindowName = "Login to Thrubi using your Google account";
export const googleWindowParams = "toolbar=no, menubar=no, width=600, height=500, top=50, left=100";

// -------
// Twitter
// -------
export const twitterAuthUri =    twitterRequestToken =>
    "https://twitter.com/oauth/authenticate?oauth_token="+twitterRequestToken;

export const twitterWindowName = "Login to Thrubi using your Twitter account";
export const twitterWindowParams = "toolbar=no, menubar=no, width=600, height=500, top=50, left=100";