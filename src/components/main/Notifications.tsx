import React, { useState, useEffect } from "react";
import { useSubscription } from "@apollo/client";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { TEMPORARY } from "../../gql/Subscriptions";

type Temporary = {
  notifications: {
    count: number;
  };
};

const Notifications: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [show, _] = useState<boolean>(!!count);
  const { data, loading } = useSubscription<{ temporary: Temporary }>(
    TEMPORARY
  );

  useEffect(() => {
    if (!loading && data) {
      const { notifications } = data.temporary;
      setCount(notifications.count);
    }
  }, [data, loading]);

  return (
    <Badge dot={show} count={count}>
      <BellOutlined style={{ fontSize: "1.4em" }} onClick={() => setCount(0)} />
    </Badge>
  );
};

export default Notifications;
