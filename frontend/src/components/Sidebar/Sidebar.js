import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  //Home as HomeIcon,
  //NotificationsNone as NotificationsIcon,
  //FormatSize as TypographyIcon,
  //FilterNone as UIElementsIcon,
  ////BorderAll as TableIcon,
  // QuestionAnswer as SupportIcon,
  //LibraryBooks as LibraryIcon,
  //HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import PeopleIcon from "@material-ui/icons/People";
import NewReleasesOutlinedIcon from "@material-ui/icons/NewReleasesOutlined";
import ComputerIcon from "@material-ui/icons/Computer";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
//import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import DesktopAccessDisabledOutlinedIcon from "@material-ui/icons/DesktopAccessDisabledOutlined";
import BarChartIcon from '@material-ui/icons/BarChart';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
//import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <DashboardOutlinedIcon />,
  },
  {
    id: 1,
    label: "Clientes a Vencer",
    link: "/app/vencer",
    icon: <NewReleasesOutlinedIcon />,
  },
  {
    id: 2,
    label: "Clientes",
    link: "/app/clientes",
    icon: <PeopleIcon />,
  },
  {
    id: 3,
    label: "Clientes Vencidos",
    link: "/app/vencidos",
    icon: <DesktopAccessDisabledOutlinedIcon />,
  },
  {
    id: 4,
    label: "Servidores",
    link: "/app/servidores",
    icon: <ComputerIcon />,
  },
  {
    id: 5,
    label: "Planos",
    link: "/app/planos",
    icon: <AccountBalanceIcon />,
  },
  { id: 6, type: "divider" },
  {
    id: 7,
    label: "Clientes por Server",
    link: "/app/graficoCliServ",
    icon: <BarChartIcon/>,
  },
  /*{
    id: 1,
    label: "Typography",
    link: "/app/typography",
    icon: <TypographyIcon />,
  },
  { id: 5, label: "Tables", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 6,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />,
  },
  {
    id: 7,
    label: "UI Elements",
    link: "/app/ui",
    icon: <UIElementsIcon />,
    children: [
      { label: "Icons", link: "/app/ui/icons" },
      { label: "Charts", link: "/app/ui/charts" },
      { label: "Maps", link: "/app/ui/maps" },
    ],
  },*/
  /*{ id: 5, type: "divider" },
  { id: 6, type: "title", label: "HELP" },
  { id: 7, label: "Library", link: "", icon: <LibraryIcon /> },
  { id: 8, label: "Support", link: "", icon: <SupportIcon /> },
  { id: 9, label: "FAQ", link: "", icon: <FAQIcon /> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "PROJECTS" },
  {
    id: 12,
    label: "My recent",
    link: "",
    icon: <Dot size="small" color="warning" />,
  },
  {
    id: 13,
    label: "Starred",
    link: "",
    icon: <Dot size="small" color="primary" />,
  },
  {
    id: 14,
    label: "Background",
    link: "",
    icon: <Dot size="small" color="secondary" />,
  },*/
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            isSmallScreen={isSmallScreen()}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }

  function isSmallScreen() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;
    console.log(`isSmallScreen: ${isSmallScreen}`)
    return isSmallScreen;
  }
}

export default withRouter(Sidebar);
