import React from "react";
import { useDispatch } from "react-redux";
import notificationAction from "../../store/actions/notificationAction";
import { Sidebar, CloseSidebar, List } from "../../layout/Notifications";

const template = (notice: string) => <li key={Math.random()}>{notice}</li>;

type Props = {
  notifications: string[];
};

const NotificationSidebar: React.FC<Props> = ({ notifications }) => {
  const dispatch = useDispatch();
  return (
    <Sidebar>
      <CloseSidebar
        onClick={() => dispatch(notificationAction({ show: true }))}
      />
      <List>{notifications.map((notice) => template(notice))}</List>
    </Sidebar>
  );
};

export default NotificationSidebar;
