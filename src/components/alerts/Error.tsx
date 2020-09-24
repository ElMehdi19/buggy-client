import React from "react";
import { WarningFilled } from "@ant-design/icons";
import { Alert } from "../../layout/Alert";

type Props = {
  message: string;
};

const Error: React.FC<Props> = ({ message }) => {
  return (
    <Alert className="alert-error">
      <div className="alert-icon">
        <WarningFilled style={{ fontSize: "30px" }} />
      </div>
      <h3>{message}</h3>
    </Alert>
  );
};

export default Error;
