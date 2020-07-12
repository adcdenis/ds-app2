import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  //InputBase,
  Menu,
  MenuItem,
  //Fab,
  //Link
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  //MailOutline as MailIcon,
  NotificationsNone as NotificationsIcon,
  //Person as AccountIcon,
  //Search as SearchIcon,
  //Send as SendIcon,
  //ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import TvIcon from "@material-ui/icons/Tv";
import Container from "@material-ui/core/Container";

import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
//import UserAvatar from "../UserAvatar/UserAvatar";

//redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { logout } from "../../my_pages/auth/authActions";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import ninja1 from "../../my_images/ninja1.png";
/*import ninja2 from "../../my_images/ninja2.png";
import ninja3 from "../../my_images/ninja3.png";
import ninja4 from "../../my_images/ninja4.png";
import ninja5 from "../../my_images/ninja5.jpg";*/
import { getCountAVencer } from '../../my_pages/dashboard/dashboardActions'
import { useHistory } from 'react-router-dom';

//import NotificationMy from '../../my_common/notification/notification'

const notifications = [
  {
    id: 0,
    color: "secondary",
    type: "notification",
    message: "Clientes a vencer em 3 dias",
  },
];

/*function randomImage() {
  const min = 1;
  const max = 5;
  const img = min + Math.floor((max - min) * Math.random());
  switch (img) {
    case 1:
      return ninja1;
    case 2:
      return ninja2;
    case 3:
      return ninja3;
    case 4:
      return ninja4;
    case 5:
      return ninja5;
    default:
      return ninja4;
  }
}*/

function Header(props) {

  const history = useHistory();

  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isRandomImage, setRandomImage] = useState(true);
  var [ninja, setNinja] = useState(null);
  //var [notif, setNotif] = useState(notifications);

  if(isRandomImage) {
    //setNinja(randomImage());
    setNinja(ninja1);
    setRandomImage(false)
    props.getCountAVencer(3)
  }

  //var noti = notif[0]
  //noti.message = props.totalAVencer
  //setNotif([noti])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <TvIcon fontSize="large" />
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          DS TV
        </Typography>
        <div className={classes.grow} />
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? props.totalAVencer : null}
            color="secondary"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <Avatar
            alt={props.user.name}
            //src="http://lorempixel.com/160/160/people"
            src={ninja}
            classes={{ root: classes.headerIcon }}
          />
        </IconButton>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => {setNotificationsMenu(null); history.push("/app/vencer")}}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <div className={classes.avatar}>
              <Container>
                <Avatar
                  alt={props.user.name}
                  //src="http://lorempixel.com/160/160/people"
                  src={ninja}
                  className={classes.large2}
                />
              </Container>
            </div>
            <Typography variant="h4" weight="medium">
              {props.user.name}
            </Typography>
            <Typography color="text" colorBrightness="secondary">
              {props.user.email}
            </Typography>
          </div>
          <div className={classes.profileMenuUser} onClick={props.logout}>
            <Button
              variant="contained"
              startIcon={<ExitToAppOutlinedIcon />}
              color="primary"
            >
              Sair
            </Button>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = state => ({ totalAVencer: state.dashboard.totalAVencer.value, user: state.auth.user });
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getCountAVencer }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Header);
