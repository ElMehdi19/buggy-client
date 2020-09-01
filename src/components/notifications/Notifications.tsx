import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { NOTIFICATIONS } from "../../gql/Queries";
import { RESET_NOTIFICATIONS_COUNT } from "../../gql/Mutations";
import { NEW_NOTIFICATION } from "../../gql/Subscriptions";
import NotificationSidebar from "./NotificationSidebar";
import { RootState } from "../../store/reducers/rootReducer";
import { notificationState } from "../../store/reducers/notificationReducer";
import notificationAction from "../../store/actions/notificationAction";
import { client } from "../../App";
import { updateCache } from "../../utlis";

type NewNotification = {
  newNotification: {
    notifier: number;
    report: number;
    notification: string;
  };
};

type Notifications = {
  notifications: {
    count: number;
    notifications: {
      report: number;
      notification: string;
    }[];
  };
};

const Notifications: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<
    { report: number; notification: string }[]
  >([]);
  const [show] = useState<boolean>(!!count);
  const { data: noticesData, loading: noticesLoading } = useQuery<
    Notifications
  >(NOTIFICATIONS);
  const { data, loading } = useSubscription<NewNotification>(NEW_NOTIFICATION);
  const [resetNotificationsCount] = useMutation(RESET_NOTIFICATIONS_COUNT, {
    onCompleted: () => setCount(0),
  });

  const notificationState = useSelector<RootState, notificationState>(
    (store) => store.notifications
  );
  const dispatch = useDispatch();

  const handleBellClick = () => {
    dispatch(notificationAction(notificationState));
    resetNotificationsCount();
    const cache = client.readQuery<Notifications>({ query: NOTIFICATIONS });
    if (cache) {
      const { notifications } = cache;
      const update: Notifications = {
        notifications: {
          ...notifications,
          count: 0,
        },
      };
      updateCache(NOTIFICATIONS, update);
    }
  };

  useEffect(() => {
    if (!noticesLoading && noticesData) {
      setNotifications(noticesData.notifications.notifications);
      setCount(noticesData.notifications.count);
    }
  }, [noticesData, noticesLoading]);

  useEffect(() => {
    if (!loading && data) {
      const { notifier, notification, report } = data.newNotification;
      const userId = localStorage.getItem("userId");
      if (userId && notifier !== parseInt(userId)) {
        setNotifications([{ notification, report }, ...notifications]);
        setCount(count + 1);
        const cache = client.readQuery<Notifications>({ query: NOTIFICATIONS });
        if (cache) {
          const { notifications } = cache;
          const update: Notifications = {
            notifications: {
              notifications: [
                { notification, report },
                ...notifications.notifications,
              ],
              count: count + 1,
            },
          };
          updateCache(NOTIFICATIONS, update);
        }
      }
    }
    // eslint-disable-next-line
  }, [data, loading]);
  return (
    <div>
      <Badge dot={show} count={count}>
        <BellOutlined style={{ fontSize: "1.4em" }} onClick={handleBellClick} />
      </Badge>
      {notificationState.show && (
        <NotificationSidebar notifications={notifications.slice(0, 7)} />
      )}
    </div>
  );
};

export default Notifications;
