import "./init";

import { Admin, Resource, ShowGuesser } from "react-admin";
import { CognitoAuthProvider, Login } from "ra-auth-cognito";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { dataProvider } from "./dataProvider";

import { config } from "./config";
import { JobCreate, JobEdit, JobList } from "./jobs";
import { Dashboard } from "./Dashboard";

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
      dashboard={Dashboard}
    >
      <Resource name="jobs" list={JobList} create={JobCreate} show={ShowGuesser} edit={JobEdit}/>
    </Admin>
  );
};
