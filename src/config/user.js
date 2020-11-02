import flareBook from "./flare";

export const loggableActionType = {
    clickChannel:   "CLICK_CHANNEL",
    clickFaq:       "CLICK_FAQ",
    clickGuestMenu: "CLICK_GUEST_MENU",
};

export const loggableActionValue = {
    VISION_IDENTITY:            "VISION_IDENTITY",
    VISION_INCOME_DISCLOSE:     "VISION_INCOME_DISCLOSE",
    VISION_INCOME_VERIFY:       "VISION_INCOME_VERIFY",
    VISION_INCOME_FRAUD:        "VISION_INCOME_FRAUD",
    VISION_UBI_MONTHLY:         "VISION_UBI_MONTHLY",
    VISION_TAX_HAVENS:          "VISION_TAX_HAVENS",
    WEALTHY_GOLD:               "WEALTHY_GOLD",
    WEALTHY_COMPANY:            "WEALTHY_COMPANY",
    WEALTHY_WORLDWIDE:          "WEALTHY_WORLDWIDE",
    WEALTHY_PUBLIC_INFO:        "WEALTHY_PUBLIC_INFO",
    WEALTHY_BUSINESS_MODEL:     "WEALTHY_BUSINESS_MODEL",
    SOCIETIES_THRUBI_WHY:       "SOCIETIES_THRUBI_WHY",
    SOCIETIES_UBI_GOV:          "SOCIETIES_UBI_GOV",
    SOCIETIES_MODELS_PUBLIC:    "SOCIETIES_MODELS_PUBLIC",
    SOCIETIES_GOV_CONTRIBUTE:   "SOCIETIES_GOV_CONTRIBUTE",
    SOCIETIES_MODELS_ABOUT:     "SOCIETIES_MODELS_ABOUT",
    SOCIETIES_FLAT_UBI:         "SOCIETIES_FLAT_UBI",
};

const userOptions = {
    optionUserMenu: {
        ACCOUNT:        "ACCOUNT",
        PAYMENT:        "PAYMENT",
        AUTHENTICATION: "AUTHENTICATION",
    },
};

export const optionUserMenu = userOptions.optionUserMenu;

const flags = {
    deactivated:        null,
    emailVerified:      null,
    identityCertified:  null,
    incomeApproved:     null,
};

Object.keys(flags).map(key => flags[key]=key);

export const userFlags = flags;

export const flagFlare = (newState,flag) => {
    if (newState<0) {
        switch (flag) {
            case userFlags.deactivated:         return flareBook.infoFlare.DEACTIVATED_PENDING;
            case userFlags.emailVerified:       return flareBook.infoFlare.EMAIL_VERIFIED_PENDING;
            case userFlags.identityCertified:   return flareBook.infoFlare.IDENTITY_CERTIFIED_PENDING;
            case userFlags.incomeApproved:      return flareBook.infoFlare.INCOME_APPROVED_PENDING;
            default: return null;
        }
    } else {
        if (newState) {
            switch (flag) {
                case userFlags.deactivated:         return flareBook.infoFlare.DEACTIVATED_ON;
                case userFlags.emailVerified:       return flareBook.infoFlare.EMAIL_VERIFIED_ON;
                case userFlags.identityCertified:   return flareBook.infoFlare.IDENTITY_CERTIFIED_ON;
                case userFlags.incomeApproved:      return flareBook.infoFlare.INCOME_APPROVED_ON;
                default: return null;
            }
        } else {
            switch (flag) {
                case userFlags.deactivated:         return flareBook.infoFlare.DEACTIVATED_OFF;
                case userFlags.emailVerified:       return flareBook.infoFlare.EMAIL_VERIFIED_OFF;
                case userFlags.identityCertified:   return flareBook.infoFlare.IDENTITY_CERTIFIED_OFF;
                case userFlags.incomeApproved:      return flareBook.infoFlare.INCOME_APPROVED_OFF;
                default: return null;
            }
        }
    }
};

export const activationState = {
    activated:              0,
    userRequestDeactivated: 1,
};


export const detailName = {
    all:                "all",                  //special detailName used to delete all the other details
    name:               "name",
    surname:            "surname",
    email:              "email",
    profilePicture:     "profilePicture",
    document:           "document",
    submittedDocument:  "submittedDocument",
};

export default userOptions;