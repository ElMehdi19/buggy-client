import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { NOTIFICATION_COUNT } from "../../gql/Queries";
import { RESET_NOTIFICATIONS_COUNT } from "../../gql/Mutations";
import { NEW_NOTIFICATION } from "../../gql/Subscriptions";

type NewNotification = {
  newNotification: {
    notification: string;
  };
};

const Notifications: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [show, _] = useState<boolean>(!!count);
  const { data: countData, loading: countLoading } = useQuery<{
    notificationCount: number;
  }>(NOTIFICATION_COUNT);
  const { data, loading } = useSubscription<NewNotification>(NEW_NOTIFICATION);
  const [resetNotificationsCount] = useMutation(RESET_NOTIFICATIONS_COUNT, {
    onCompleted: () => setCount(0),
  });
  useEffect(() => {
    if (!countLoading && countData) {
      setCount(countData.notificationCount);
    }
  }, [countData, countLoading]);
  useEffect(() => {
    if (!loading && data) {
      const { notification } = data.newNotification;
      setCount(count + 1);
      // console.log(notification);
    }
  }, [data, loading]);

  return (
    <Badge dot={show} count={count}>
      <BellOutlined
        style={{ fontSize: "1.4em" }}
        onClick={() => resetNotificationsCount()}
      />
    </Badge>
  );
};

export default Notifications;
