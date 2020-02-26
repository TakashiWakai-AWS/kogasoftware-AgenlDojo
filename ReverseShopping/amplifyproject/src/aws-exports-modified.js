// import Amplify, { Auth } from 'aws-amplify';

export default {
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'ap-northeast-1:91ce23e2-2ce2-4010-818d-5d9331abc3aa',
    
    // REQUIRED - Amazon Cognito Region
    region: 'ap-northeast-1',

    // // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: 'XX-XXXX-X',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'ap-northeast-1_dWYusBjR7',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '7fk31975m77n1ooq8085j0qprk',

    // // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    // mandatorySignIn: false,

    // // OPTIONAL - Configuration for cookie storage
    // // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    // // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //     domain: '.yourdomain.com',
    // // OPTIONAL - Cookie path
    //     path: '/',
    // // OPTIONAL - Cookie expiration in days
    //     expires: 365,
    // // OPTIONAL - Cookie secure flag
    // // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //     secure: true
    // },

    // // OPTIONAL - customized storage object
    // storage: new MyStorage(),
    
    // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH'
  }
};