import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { Register } from '../Components/Auth/Register/register';
import { Login } from '../Components/Auth/Login/login';
import { LayoutComponent } from '../Components/Layout/Layout';
// temporary
import VacationCardAdminAdd from '../Components/Vacations/Admin/VacationCardAdminAdd/VacationCardAdminAdd';
import VacationCardAdminEdit from '../Components/Vacations/Admin/VacationCardAdminEdit/VacationCardAdminEdit';
import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';
import FollowersChart from '../Components/Vacations/Admin/FollowersChart/FollowersChart';

const Routing = () => {
  let isAdmin = useSelector((state: RootStore) => state.Auth.isAdmin);
  if (isAdmin === undefined) {
    isAdmin = false;
  }

  const PrivateRoute = ({ component, ...rest }: any) => {
    if (isAdmin) {
      //Access for admin user
      return <Route {...rest} component={component} />;
    } else {
      //Regular user can only access
      return <Route {...rest} component={LayoutComponent} />;
    }
  };

  return (
    <>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/register' exact component={Register} />

        {/* Private route for authorized user */}
        <PrivateRoute path='/home' exact component={LayoutComponent} />

        {/* Private route for admin */}
        <PrivateRoute
          path='/add-vacation'
          exact
          component={VacationCardAdminAdd}
        />
        <PrivateRoute
          path='/edit-vacation'
          exact
          component={VacationCardAdminEdit}
        />
        <PrivateRoute
          path='/chart'
          exact
          component={FollowersChart}
        />
      </Switch>
    </>
  );
};
export default Routing;
