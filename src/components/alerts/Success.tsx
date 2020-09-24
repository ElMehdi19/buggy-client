import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Alert } from "../../layout/Alert";

const Success: React.FC = () => {
  return (
    <Alert className="alert-success">
      <div className="alert-icon">
        <CheckCircleFilled style={{ fontSize: "30px" }} />
      </div>
      <div>
        <h3>Success!</h3>
        <h3>Your preferences have been updated.</h3>
      </div>
    </Alert>
  );
};

export default Success;
