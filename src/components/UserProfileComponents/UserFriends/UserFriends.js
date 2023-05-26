import "./UserFriends.scss";

// libs
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "react-query";
import {
  fadeInVariant,
  pageVariant,
  slideVariant,
} from "../../../pageVariants/variants";
import axios from "axios";
import Fuse from "fuse.js";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

export default function UserFriends({
  userInfo,
  token,
  socket,
}) {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
  const [users, setUsers] = useState(null);

  const { enqueueSnackbar } = useSnackbar();

  const fuse = useMemo(() => {
    const options = {
      keys: ["username"],
    };

    if (users) {
      return new Fuse(users, options);
    }
    return null;
  }, [users]);

  const queryClient = useQueryClient();

  const handleSearch = (text) => {
    if (fuse && text.trim() !== "") {
      const results = fuse.search(text);
      setSearchResults(results.map((result) => result.item));
      console.log(results);
    } else {
      setSearchResults([]);
    }
  };

  const addFriendMutation = useMutation(
    async (friendId) => {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/friends`,
        { friend: friendId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    },
    {
      onSuccess: (_data, variables) => {
        enqueueSnackbar("Success", {
          variant: "success",
          style: {
            backgroundColor: "#578C7A",
            height: "4rem",
            borderRadius: "18px",
          },
        });
        socket.emit("addFriend", variables);
        queryClient.refetchQueries("userInfo");
      },
      onError: (error) => {
        console.error("Failed to fetch add friend: ", error);
        enqueueSnackbar("Failure", {
          variant: "error",
          style: {
            backgroundColor: "#eb4343",
            height: "4rem",
            borderRadius: "18px",
          },
        });
      },
    }
  );

  const handleAddFriend = async (friendId) => {
    try {
      await addFriendMutation.mutateAsync(friendId);
    } catch (error) {
      console.error("Failed to fetch add friend: ", error);
    }
  };

  const removeFriendMutation = useMutation(
    async (friendId) => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/friends`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          friend: friendId,
        },
      });
    },
    {
      onSuccess: (_data, variables) => {
        enqueueSnackbar("Success", {
          variant: "success",
          style: {
            backgroundColor: "#578C7A",
            height: "4rem",
            borderRadius: "18px",
          },
        });
        socket.emit("removeFriend", variables);
        queryClient.refetchQueries("userInfo");
      },
      onError: (error) => {
        console.error("Failed to fetch remove friend: ", error);
        enqueueSnackbar("Failure", {
          variant: "error",
          style: {
            backgroundColor: "#eb4343",
            height: "4rem",
            borderRadius: "18px",
          },
        });
      },
    }
  );

  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriendMutation.mutateAsync(friendId);
    } catch (error) {
      console.error("Failed to fetch remove friend: ", error);
    }
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };
    fetchAllUsers();
  }, [token]);

  return (
    <motion.section
      className="user"
      initial="initial"
      animate="in"
      exit="out"
      variants={fadeInVariant}
      transition={{ duration: 0.7 }}
    >
      <img
        src={userInfo.avatar_image}
        className="user__avatar"
        alt="user avatar"
      />

      <div className="user__links">
        <Link
          to="/user/profile"
          className={`user__link-item ${
            location.pathname === "/user/profile"
              ? "user__link-item--selected"
              : ""
          }`}
        >
          <AccountCircleIcon /> Profile
        </Link>
        <Link
          to="/user/privacy"
          className={`user__link-item ${
            location.pathname === "/user/privacy"
              ? "user__link-item--selected"
              : ""
          }`}
        >
          <AdminPanelSettingsIcon /> Privacy
        </Link>
        <Link
          to="/user/friends"
          className={`user__link-item ${
            location.pathname === "/user/friends"
              ? "user__link-item--selected"
              : ""
          }`}
        >
          <PeopleAltIcon /> Friends
        </Link>
      </div>

      <div className="friends">
        <div className="friends__search-input-wrapper">
          <div className="friends__search-wrapper">
            <SearchRoundedIcon className="friends__search-icon" />
            <input
              type="search"
              name="friends__searchbar"
              className="friends__searchbar"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search @username"
            />
          </div>
          <p>
            Results: {searchResults?.length === 0 ? "-" : searchResults?.length}{" "}
          </p>
        </div>
        <div className="friends__cards-wrapper">
          {searchResults &&
            searchResults.map((result, index) => {
              const isFriend = userInfo.friends.some(
                (friend) =>
                  friend.friend === result.user_id &&
                  friend.status === "accepted"
              );
              const isPending = userInfo.friends.some(
                (friend) =>
                  friend.friend === result.user_id &&
                  friend.status === "pending"
              );

              return (
                <article className={`friends__item`} key={result.user_id}>
                  <div className="friends__item-container">
                    <h3 className="friends__item-number">{index + 1}:</h3>
                    <img
                      src={result.avatar_image}
                      className="friends__item-image"
                      alt={result.username}
                    />

                    <div className="friends__info-wrapper">
                      <div className="friends__info-text-wrapper">
                        <div className="friends__item-info">
                          <h3>{`${result.first_name} ${result.last_name} `}</h3>
                        </div>
                        <div className="friends__item-info">
                          <p>{`@${result.username.toLowerCase()}`}</p>
                        </div>
                      </div>
                      <div className="friends__item-info">
                        {isFriend ? (
                          <button
                            onClick={() => handleRemoveFriend(result.user_id)}
                            className="friends__CTA friends__CTA--remove"
                          >
                            <PersonRemoveRoundedIcon /> Remove friend
                          </button>
                        ) : isPending ? (
                          <button
                            onClick={() => handleRemoveFriend(result.user_id)}
                            className="friends__CTA friends__CTA--pending"
                          >
                            <SyncRoundedIcon />
                            Pending
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddFriend(result.user_id)}
                            className="friends__CTA friends__CTA--add"
                          >
                            <PersonAddAltRoundedIcon /> Add as a friend
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </motion.section>
  );
}
