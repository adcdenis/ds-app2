import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import Messages from "../../my_common/msg/msg";
import Toast from "../../my_common/msg/toast";

// pages
//import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import Clientes from "../../my_pages/cliente/cliente";
import ClienteVencer from "../../my_pages/cliente_vencer/clienteVencer";
import ClienteVencido from "../../my_pages/cliente_vencido/clienteVencido";
import DashboardMy from "../../my_pages/dashboard/dashboard";
import Servidores from "../../my_pages/servidor/servidor";
import Planos from "../../my_pages/planos/plano";
import GrafCliServ from '../../my_pages/graficos/grafCliServer'

// context
import { useLayoutState } from "../../context/LayoutContext";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={DashboardMy} />
            <Route path="/app/clientes" component={Clientes} />
            <Route path="/app/vencer" component={ClienteVencer} />
            <Route path="/app/vencidos" component={ClienteVencido} />
            <Route path="/app/servidores" component={Servidores} />
            <Route path="/app/planos" component={Planos} />
            <Route path="/app/graficoCliServ" component={GrafCliServ} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/tables" component={Tables} />
            <Route path="/app/notifications" component={Notifications} />
            <Route
              exact
              path="/app/ui"
              render={() => <Redirect to="/app/ui/icons" />}
            />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
          </Switch>
        </div>
        <Messages />
        <Toast />
      </>
    </div>
  );
}

export default withRouter(Layout);
