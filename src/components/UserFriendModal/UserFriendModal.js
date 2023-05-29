import "./UserFriendModal.scss";

//libs
import { motion } from "framer-motion";
import { pageVariant } from "../../pageVariants/variants";
import axios from "axios";
import CountUp from "react-countup";
import { useMutation, useQueryClient, useQuery } from "react-query";
import { useSnackbar } from "notistack";

// icons
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ListAltRoundedIcon from "@mui/icons-material/ListAltRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { useRef, useEffect } from "react";

export default function UserFriendModal({
  friend,
  Toggle,
  isModalOpen,
  token,
  userInfo,
  socket,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const modalRef = useRef(null);

  const { data: friendObj } = useQuery("singleUserInfo", async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/user/${friend.current}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return response.data;
  });

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
        Toggle();
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
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        Toggle();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen, Toggle]);
  return (
    <motion.div
      className="friend-modal"
      initial="initial"
      animate={isModalOpen ? "animate" : "exit"}
      exit="exit"
      variants={pageVariant}
      transition={{ duration: 0.5 }}
      key="mobileMenu"
    >
      <div className="friend-modal__box" ref={modalRef}>
        {friendObj && (
          <>
            <div className="friend-modal__top">
              <p className="friend-modal__joined-text">
                Joined since: {new Date(friendObj.joined_at).getFullYear()}
              </p>

              <img
                src={friendObj.avatar_image}
                alt="user avatar"
                className={`friend-modal__avatar ${
                  friendObj.is_online
                    ? "friend-modal__avatar--online"
                    : "friend-modal__avatar--offline"
                }`}
              />
            </div>
            <div className="friend-modal__bottom">
              <div className="friend-modal__name-wrapper">
                <h2>{`${friendObj.first_name} ${friendObj.last_name}`}</h2>
                <div className="friend-modal__CTA-wrapper">
                  {(() => {
                    const isFriend = userInfo.friends.some(
                      (friend) =>
                        friend.friend === friendObj.user_id &&
                        friend.status === "accepted"
                    );
                    const isPending = userInfo.friends.some(
                      (friend) =>
                        friend.friend === friendObj.user_id &&
                        friend.status === "pending"
                    );
                    if (isFriend) {
                      return (
                        <PersonRemoveOutlinedIcon
                          onClick={() =>
                            handleRemoveFriend([
                              friendObj.user_id,
                              friendObj.username,
                            ])
                          }
                          className="friend-modal__cta-icon friend-modal__cta-icon--remove-friend"
                        />
                      );
                    } else if (isPending) {
                      console.log("sss");
                      return (
                        <h5
                          onClick={() =>
                            handleRemoveFriend([
                              friendObj.user_id,
                              friendObj.username,
                            ])
                          }
                        >
                          pending...
                        </h5>
                      );
                    } else {
                      return (
                        <PersonAddAltOutlinedIcon
                          onClick={() => {
                            handleAddFriend([
                              friendObj.user_id,
                              friendObj.username,
                            ]);
                          }}
                          className="friend-modal__cta-icon friend-modal__cta-icon--add-friend"
                        />
                      );
                    }
                  })()}
                </div>
              </div>
              <p className="friend-modal__username">@{friendObj.username}</p>
              <p className="friend-modal__username">
                level:{" "}
                {Math.floor(
                  friendObj.userBooks.filter((book) => book.is_pending === 0)
                    .length / 2
                )}
              </p>
            </div>
            <div className="friend-modal__friend-shelf-info">
              <div className="friend-modal__total-books-wrapper">
                <ListAltRoundedIcon className="friend-modal__criteria-icon" />
                <h3>Books in shelf</h3>
                <CountUp
                  delay={0.3}
                  duration={4}
                  end={friendObj.userBooks.length}
                />
              </div>
              <div className="friend-modal__fav-genre-wrapper">
                <StarBorderRoundedIcon className="friend-modal__criteria-icon" />
                <h3>Favorite genre</h3>
                <span>{friendObj.favorite_genre || "unknown"}</span>
              </div>
              <div className="friend-modal__fav-genre-wrapper">
                <ClassOutlinedIcon className="friend-modal__criteria-icon" />
                <h3>Books read</h3>
                <CountUp
                  delay={0.6}
                  duration={4}
                  end={
                    friendObj.userBooks.filter((book) => book.is_pending === 0)
                      .length
                  }
                />
              </div>
            </div>
          </>
        )}
        <CloseRoundedIcon
          onClick={Toggle}
          className="friend-modal__close-icon"
        />
      </div>
    </motion.div>
  );
}
