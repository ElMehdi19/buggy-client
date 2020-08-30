import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BellOutlined } from "@ant-design/icons";
import { RootState } from "../../store/reducers/rootReducer";
import { notificationState } from "../../store/reducers/notificationReducer";
import notificationAction from "../../store/actions/notificationAction";
// import NotificationSidebar from "./NotificationSidebar";

const Notifications2: React.FC = () => {
  const notificationState = useSelector<RootState, notificationState>(
    (store) => store.notifications
  );
  const dispatch = useDispatch();
  return (
    <div>
      <BellOutlined
        onClick={() => dispatch(notificationAction(notificationState))}
      />
      {/* {notificationState.show && <NotificationSidebar />} */}
    </div>
  );
};

export default Notifications2;
