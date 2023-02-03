// import { config } from 'dotenv';
import * as Msal from 'msal';
import { ConfigService } from './'
export default class AuthB2CService {
    constructor() {
        this.applicationConfig = {
            auth: {
                clientId: ConfigService._B2cClientId,
                authority: ConfigService._B2cAuthority,
                validateAuthority: false,
                redirectUri: `${window.location.origin}/authcallback`
            },
            cache:{
                cacheLocation: "sessionStorage",
                storeAuthStateInCookie: false
            }
        }

        this.msalAgent = new Msal.UserAgentApplication(this.applicationConfig);
        // this.msalAgent = new PublicClientApplication(this.applicationConfig);
        this.msalAgent.handleRedirectCallback(async (error, response) => {
            if(!response.accessToken) {
                await this.login();
            }
        });
    }

    login = async () => {
        let responseUser;
        await this.msalAgent.loginPopup(
            {
                scopes: ConfigService._B2cScopes,
                prompt: 'select_account'
            }
        ).then(response => {
            responseUser = response.account;
        }).catch((err) => {
            console.log('err',err)
        });
        return (responseUser) ? responseUser : null;
        // this.msalAgent.loginRedirect({scopes:ConfigService._B2cScopes});
        // this.msalAgent.handleRedirectPromise((response) => {
        //     console.log(response)
        // });
    }

    logout = () => this.msalAgent.logout();

    getToken = async () => {
        return await this.msalAgent.acquireTokenSilent({ scopes: [ConfigService._B2cScopes], authority: ConfigService._B2cAuthority })
            .then(accessToken => accessToken.accessToken);
    };
}