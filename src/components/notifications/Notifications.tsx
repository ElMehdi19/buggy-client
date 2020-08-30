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
    notification: string;
  };
};

type Notifications = {
  notifications: {
    count: number;
    notifications: string[];
  };
};

const Notifications: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [show, _] = useState<boolean>(!!count);
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
  };

  useEffect(() => {
    if (!noticesLoading && noticesData) {
      setNotifications(noticesData.notifications.notifications);
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
      setCount(noticesData.notifications.count);
    }
  }, [noticesData, noticesLoading]);

  useEffect(() => {
    if (!loading && data) {
      setCount(count + 1);

      const { notification } = data.newNotification;
      const cache = client.readQuery<Notifications>({
        query: NOTIFICATIONS,
      });
      if (cache) {
        const { count, notifications } = cache.notifications;
        const update: Notifications = {
          notifications: {
            count: count + 1,
            notifications: [...notifications, notification],
          },
        };
        updateCache<Notifications>(NOTIFICATIONS, update);
      }
    }
  }, [data, loading]);
  return (
    <div>
      <Badge dot={show} count={count}>
        <BellOutlined style={{ fontSize: "1.4em" }} onClick={handleBellClick} />
      </Badge>
      {notificationState.show && (
        <NotificationSidebar notifications={notifications} />
      )}
    </div>
  );
};

export default Notifications;
