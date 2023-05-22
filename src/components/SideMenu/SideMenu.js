import "./SideMenu.scss";

//libs
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariant } from "../../pageVariants/variants";

// icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

export default function SideMenu({ friends, handleLogout, setJoyrideActive, onlineFriends }) {
  const location = useLocation();
  return (
    <motion.aside
      className="side-menu"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.7, delay: 0.2 }}
    >
      <nav className="nav">
        <NavLink
          to="/Dashboard"
          className={`nav__item ${location.pathname === "/" ? "active" : ""}`}
        >
          <DashboardRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Dashboard</h3>
        </NavLink>
        <NavLink to="/manage" className="nav__item">
          <DriveFileRenameOutlineRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Mange</h3>
        </NavLink>
        <NavLink to="/my-shelf" className="nav__item">
          <ClassRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>My shelf</h3>
        </NavLink>
      </nav>
      <div className="side-menu__friends">
        <h4 className="side-menu__friends-heading">Friends</h4>
        <div className="side-menu__friends-avatars-wrapper">
          {friends.length !== 0 && onlineFriends? (
            friends.map((friend) => {
              console.log(onlineFriends);
              const isFriendOnline = onlineFriends.some(
                (onlineFriend) => onlineFriend.user_id === friend.friend
              );
              return (
                <div className="side-menu__avatar-wrapper" key={friend.username}>
                  <div
                    className={`side-menu__avatar-status ${
                      isFriendOnline ? "side-menu__avatar-status--online" : "side-menu__avatar-status--offline"
                    }`}
                  ></div>
                  <img
                    src={friend.avatar_image}
                    className={`side-menu__friends-avatar ${
                      isFriendOnline ? "side-menu__friends-avatar--online" : "side-menu__friends-avatar--offline"
                    }`}
                    alt={friend.username}
                    title={friend.username}
                  />
                </div>
              );
            })
          ) : (
            <p>no friends...</p>
          )}
        </div>
      </div>
      <div className="side-menu__bottom">
        <div
          className="side-menu__bottom-option"
          onClick={() => setJoyrideActive(true)}
        >
          <InfoRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Help</h3>
        </div>
        <div className="side-menu__bottom-option" onClick={handleLogout}>
          <MeetingRoomRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Log out</h3>
        </div>
      </div>
    </motion.aside>
  );
}
