import "./init";

import { Login } from "ra-auth-cognito";
import { Admin, Resource } from "react-admin";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { JobCreate } from "./pages/jobs/job-create";
import { JobEdit } from "./pages/jobs/job-edit";
import { JobList } from "./pages/jobs/job-list";
import { JobShow } from "./pages/jobs/job-show";
import { Dashboard } from "./Dashboard";

export function App(): JSX.Element {
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
        show={JobShow}
        edit={JobEdit}
      />
    </Admin>
  );
}
