import "./SideMenu.scss";

//libs
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { pageVariant } from "../../pageVariants/variants";
import { useRef, useState } from "react";

// icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

// components
import UserFriendModal from "../../components/UserFriendModal/UserFriendModal";

export default function SideMenu({
  userInfo,
  handleLogout,
  setJoyrideActive,
  onlineFriends,
  token,
  socket,
}) {
  const location = useLocation();
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const friendModalTarget = useRef();

  const handleFriendModalToggle = () => {
    setIsFriendModalOpen((prev) => !prev);
  };

  const handleFriendModalTarget = (friendId) => {
    friendModalTarget.current = friendId;
  };

  if (isFriendModalOpen) {
    document.querySelector("body").classList.add("modal-open");
  } else {
    document.querySelector("body").classList.remove("modal-open");
  }

  return (
    <AnimatePresence>
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
            <DriveFileRenameOutlineRoundedIcon
              style={{ fontSize: "2.25rem" }}
            />
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
            {userInfo.friends &&
            onlineFriends &&
            userInfo.friends.filter((friend) => friend.status === "accepted")
              .length !== 0 &&
            onlineFriends ? (
              userInfo.friends
                .filter((friend) => friend.status === "accepted")
                .map((friend) => {
                  const isFriendOnline = onlineFriends.some(
                    (onlineFriend) =>
                      onlineFriend.user_id === friend.friend ||
                      friend.friend === onlineFriend.user_id
                  );
                  return (
                    <div
                      className="side-menu__avatar-wrapper"
                      key={friend.friend}
                      onClick={() => {
                        handleFriendModalTarget(friend.friend);
                        handleFriendModalToggle();
                      }}
                    >
                      <div
                        className={`side-menu__avatar-status ${
                          isFriendOnline
                            ? "side-menu__avatar-status--online"
                            : "side-menu__avatar-status--offline"
                        }`}
                      ></div>
                      <img
                        src={friend.avatar_image}
                        className={`side-menu__friends-avatar ${
                          isFriendOnline
                            ? "side-menu__friends-avatar--online"
                            : "side-menu__friends-avatar--offline"
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
      {isFriendModalOpen && (
        <UserFriendModal
          key="userFriendModal"
          userInfo={userInfo}
          Toggle={handleFriendModalToggle}
          isModalOpen={isFriendModalOpen}
          token={token}
          friend={friendModalTarget}
          socket={socket}
        />
      )}
    </AnimatePresence>
  );
}
