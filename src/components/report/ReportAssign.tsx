import React from "react";
import { Dispatch } from "redux";
import { Button } from "antd";
import { isManager } from "../../utils";
import { UserType } from "./Report";
type Props = {
  manager: { id: number } | undefined | null;
  assignee: UserType | undefined;
  dispatch: Dispatch;
};

const ReportAssign: React.FC<Props> = ({ manager, assignee, dispatch }) => {
  const handleClick = () => dispatch({ type: "SHOW_MODAL" });
  if (isManager(manager?.id) && assignee)
    return (
      <Button type="primary" title="Reassign" onClick={handleClick}>
        {assignee.firstName} {assignee.lastName}
      </Button>
    );

  if (isManager(manager?.id) && !assignee)
    return (
      <Button type="primary" onClick={handleClick}>
        Assign
      </Button>
    );

  if (!isManager(manager?.id) && assignee)
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span>Assinged to</span>
        <span style={{ color: "#1890ff" }} title="assign">
          {assignee.firstName} {assignee.lastName}
        </span>
      </div>
    );

  return null;
};

export default ReportAssign;
