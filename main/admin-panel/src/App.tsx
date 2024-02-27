import "./init";

import { Admin, Resource } from "react-admin";
import { CognitoAuthProvider, Login } from "ra-auth-cognito";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { dataProvider } from "./dataProvider";

import { config } from "./config";

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.appClientId,
});

const authProvider = CognitoAuthProvider(userPool);

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      title="Example Admin"
      loginPage={Login}
    >
      <Resource name="posts" />
    </Admin>
  );
};
