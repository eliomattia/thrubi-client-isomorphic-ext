import {guestMenuOption} from "../guest";
import {optionUserMenu} from "../user";

const regexExact = {
    ROOT:                       {r:"^/$",                       g:null,                         u:null,},
    HOME:                       {r:"^/home$",                   g:guestMenuOption.HOME,         u:null,},
    VISION:                     {r:"^/vision$",                 g:guestMenuOption.VISION,       u:null,},
    FAQ:                        {r:"^/faq$",                    g:guestMenuOption.FAQ,          u:null,},
    INFOGRAPHICS:               {r:"^/infographics$",           g:guestMenuOption.INFOGRAPHICS, u:null,},
    BLOG:                       {r:"^/blog$",                   g:guestMenuOption.BLOG,         u:null,},
    CONTACT:                    {r:"^/contact$",                g:guestMenuOption.CONTACT,      u:null,},
    USER:                       {r:"^/user$",                   g:guestMenuOption.USER,         u:null,},
    USER_MENU:                  {r:"^/user/menu$",              g:null,                         u:null,},
    USER_MENU_ACCOUNT:          {r:"^/user/menu/profile$",      g:null,                         u:optionUserMenu.ACCOUNT,},
    USER_MENU_PAYMENT:          {r:"^/user/menu/payments$",     g:null,                         u:optionUserMenu.PAYMENT,},
    USER_MENU_AUTHENTICATION:   {r:"^/user/menu/credentials$",  g:null,                         u:optionUserMenu.AUTHENTICATION,},
    AUTH_LOGIN:                 {r:"^/auth/login$",             g:null,                         u:null,},
    AUTH_SIGNUP:                {r:"^/auth/signup$",            g:null,                         u:null,},
    AUTH_REDIRECT:              {r:"^/auth/redirect$",          g:null,                         u:null,},
    EMAIL_VERIFY:               {r:"^/email/verify$",           g:null,                         u:null,},
    NOT_FOUND:                  {r:"^/404$",                    g:null,                         u:null,},
};

const exact =
    Object
        .keys(regexExact)
        .map(key => ({[key]:{r:regexExact[key].r.replace("^","").replace("$",""),g:regexExact[key].g,u:regexExact[key].u}}))
        .reduce((c,next) => Object.assign({},c,next),{});

const nested = {
    ROOT:       "/",
    AUTH:       "/auth",
    USER:       "/user",
    USER_MENU:  "/user/menu",
};

const params = {
    LOGIN_SIGNUP:   {
        key: "/:loginSignup",
        values: {
            LOGIN:  "login",
            SIGNUP: "signup",
        }
    },
};

export const regexExactRoutes = regexExact;
export const exactRoutes = exact;
export const nestedRoutes = nested;
export const routeParams = params;
