import "./SideMenu.scss";

import { Link, NavLink, useNavigate } from "react-router-dom";

// icons
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import ClassRoundedIcon from "@mui/icons-material/ClassRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";

export default function SideMenu({ friends }) {
  const navigate = useNavigate();

  // for log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <aside className="side-menu">
      <nav className="nav">
        <NavLink to="/Dashboard" className="nav__item">
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
          {friends.length !== 0 ? friends.map((friend) => {
            return (
              <img
              src={friend.avatar_image}
              className="side-menu__friends-avatar"
              alt={friend.username}
              title={friend.username}
              key={friend.user_id}
              />
            );
          }) : <p>no friends...</p>}
        </div>
      </div>
      <div className="side-menu__bottom">
        <div className="side-menu__bottom-option">
          <InfoRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Help</h3>
        </div>
        <div className="side-menu__bottom-option" onClick={handleLogout}>
          <MeetingRoomRoundedIcon style={{ fontSize: "2.25rem" }} />
          <h3>Log out</h3>
        </div>
      </div>
    </aside>
  );
}
