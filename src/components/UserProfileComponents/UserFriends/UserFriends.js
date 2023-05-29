import "./UserFriends.scss";

// libs
import { useEffect, useState, useMemo, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "react-query";
import { fadeInVariant, slideVariant } from "../../../pageVariants/variants";
import axios from "axios";
import Fuse from "fuse.js";

// components
import UserFriendModal from "../../../components/UserFriendModal/UserFriendModal";

// icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";

export default function UserFriends({ userInfo, token, socket }) {
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [searchResults, setSearchResults] = useState(null);
  const [users, setUsers] = useState(null);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const friendModalTarget = useRef();


  if (isFriendModalOpen) {
    document.querySelector("body").classList.add("modal-open");
  } else {
    document.querySelector("body").classList.remove("modal-open");
  }

  const queryClient = useQueryClient();

  const fuse = useMemo(() => {
    const options = {
      keys: ["username"],
    };

    if (users) {
      return new Fuse(users, options);
    }
    return null;
  }, [users]);

  const handleSearch = (text) => {
    if (fuse && text.trim() !== "") {
      const results = fuse.search(text);
      setSearchResults(results.map((result) => result.item));
      console.log(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleFriendModalToggle = () => {
    setIsFriendModalOpen((prev) => !prev);
  };

  const handleFriendModalTarget = (friendId) => {
    friendModalTarget.current = friendId;
  };

  const addFriendMutation = useMutation(
    async (friend) => {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/friends`,
        { friend: friend[0] },
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
        socket.emit("sendNotification", {
          recipient_id: variables[0],
          sender_id: userInfo.user_id,
          message: `Friend request from ${userInfo.username} to ${variables[0]}`,
          notification_type: "friendRequest/add",
        });
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

  const handleAddFriend = async (friend) => {
    try {
      await addFriendMutation.mutateAsync(friend);
    } catch (error) {
      console.error("Failed to fetch add friend: ", error);
    }
  };

  const removeFriendMutation = useMutation(
    async (friend) => {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/friends`, {
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          friend: friend[0],
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
        socket.emit("sendNotification", {
          recipient_id: variables[0],
          sender_id: userInfo.user_id,
          message: `${userInfo.username} removed ${variables[0]}`,
          notification_type: "friendRequest/remove",
        });
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

  const handleRemoveFriend = async (friend) => {
    try {
      await removeFriendMutation.mutateAsync(friend);
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
    <AnimatePresence>
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

        <motion.div
          className="friends"
          initial="initial"
          animate="in"
          exit="out"
          variants={slideVariant}
          transition={{ duration: 0.7 }}
        >
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
              Results:{" "}
              {searchResults?.length === 0 ? "-" : searchResults?.length}{" "}
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
                  <article
                    onClick={() => {
                     
                      handleFriendModalTarget(result.user_id);
                      handleFriendModalToggle();
                    }}
                    className={`friends__item`}
                    key={result.user_id}
                  >
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
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveFriend([
                                  result.user_id,
                                  result.username,
                                ]);
                              }}
                              className="friends__CTA friends__CTA--remove"
                            >
                              <PersonRemoveRoundedIcon /> Remove friend
                            </button>
                          ) : isPending ? (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleRemoveFriend([
                                  result.user_id,
                                  result.username,
                                ]);
                              }}
                              className="friends__CTA friends__CTA--pending"
                            >
                              <SyncRoundedIcon />
                              Pending
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleAddFriend([
                                  result.user_id,
                                  result.username,
                                ]);
                              }}
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
        </motion.div>
      </motion.section>
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
