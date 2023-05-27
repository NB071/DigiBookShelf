import React from "react";
import "./HeaderNotification.scss";

// libs
import { motion } from "framer-motion";
import { pageVariantTop } from "../../pageVariants/variants";
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "notistack";
import axios from "axios";

// icons
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";

const HeaderNotification = React.forwardRef(
  ({ notifications, token, handleNotification }, ref) => {
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();

    const acceptFriendMutation = useMutation(
      async (friend) => {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/friends/accept`,
          { friend: friend },
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

          queryClient.refetchQueries("userInfo");
          handleNotification((prev) =>
            prev.filter(
              (notification) =>
                (notification.notification === "friendRequest/remove" ||
                  notification.notification === "friendRequest/add") &&
                notification.notificationFrom.user_id !== variables
            )
          );
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

    const handleAcceptFriend = async (friend) => {
      console.log(friend);
      try {
        await acceptFriendMutation.mutateAsync(friend);
      } catch (error) {
        console.error("Failed to fetch add friend: ", error);
      }
    };

    const rejectFriendMutation = useMutation(
      async (friend) => {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/user/friends/reject`,
          { friend: friend },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
      },
      {
        onSuccess: (_data, variables) => {
          console.log(variables);
          enqueueSnackbar("Success", {
            variant: "success",
            style: {
              backgroundColor: "#578C7A",
              height: "4rem",
              borderRadius: "18px",
            },
          });

          queryClient.refetchQueries("userInfo");
          handleNotification((prev) =>
            prev.filter(
              (notification) =>
                (notification.notification === "friendRequest/remove" ||
                  notification.notification === "friendRequest/add") &&
                notification.notificationFrom.user_id !== variables
            )
          );
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

    const handleRejectFriend = async (friend) => {
      try {
        await rejectFriendMutation.mutateAsync(friend);
      } catch (error) {
        console.error("Failed to fetch add friend: ", error);
      }
    };

    return (
      <motion.div
        ref={ref}
        className="notification"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariantTop}
        transition={{ duration: 0.3 }}
      >
        {notifications && notifications.length !== 0 ? (
          notifications.map((notificationItem, index) => (
            <div className="notification__item" key={index}>
              {console.log(notificationItem)}
              <div className="notification__left">
                <img
                  src={notificationItem.notificationFrom.avatar_image}
                  className="notification__sender-avatar"
                  alt="sender avatar"
                />
              </div>
              <div className="notification__right">
                <h2 className="notification__heading">
                  {notificationItem.notification.startsWith("friendRequest/add")
                    ? "New friend request!"
                    : notificationItem.notification.startsWith(
                        "friendRequest/remove"
                      )
                    ? "Remove friend!"
                    : null}
                </h2>
                <p>from: {notificationItem.notificationFrom.username}</p>
                <div className="notification__CTA">
                  {notificationItem.notification.startsWith(
                    "friendRequest/add"
                  ) ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          handleAcceptFriend(
                            notificationItem.notificationFrom.user_id
                          )
                        }
                        className="notification__CTA-button notification__CTA-button--accept"
                      >
                        <CheckCircleRoundedIcon className="notification__CTA-button-accept" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleRejectFriend(
                            notificationItem.notificationFrom.user_id
                          )
                        }
                        className="notification__CTA-button notification__CTA-button--reject"
                      >
                        <RemoveCircleRoundedIcon className="notification__CTA-button-reject" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="notification__empty-text">No notification....</p>
        )}
      </motion.div>
    );
  }
);

export default HeaderNotification;
