export default {
    oidc:{
        clientId:'0oa75e5hnq5YbfuF05d7',//public identifier
        issuer:'https://dev-33149431.okta.com/oauth2/default',//issue token, url when authorizing with okta Authorization Server
        redirectUri: 'http://localhost:4200/login/callback',//once user logs in, driect them there
        scopes:['openid','profile','email']//provide access to information about a user
    }
}
