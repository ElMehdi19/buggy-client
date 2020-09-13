import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import notificationAction from "../../store/actions/notificationAction";
import { Sidebar, CloseSidebar, List } from "../../layout/Notifications";

type Notification = { report: number; notification: string };

type Props = {
  notifications: Notification[];
};

const template = (notice: Notification) => (
  <Link to={`/reports/${notice.report}`} key={notice.notification}>
    <li key={Math.random()}>{notice.notification}</li>
  </Link>
);

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
