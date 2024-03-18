import "./init";

import { Login } from "ra-auth-cognito";
import { Admin, Resource, ShowGuesser } from "react-admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { JobCreate } from "./pages/jobs/job-create";
import { JobEdit } from "./pages/jobs/job-edit";
import { JobList } from "./pages/jobs/job-list";
import { Dashboard } from "./Dashboard";

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      title="Example Admin"
      loginPage={Login}
      dashboard={Dashboard}
    >
      <Resource
        name="jobs"
        list={JobList}
        create={JobCreate}
        show={ShowGuesser}
        edit={JobEdit}
      />
    </Admin>
  );
};
