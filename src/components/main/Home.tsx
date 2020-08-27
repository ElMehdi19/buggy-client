import React from "react";
import { useSelector } from "react-redux";
import { Button } from "antd";
import { RouteComponentProps, Redirect, Link } from "react-router-dom";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";
import ReportsMain from "../report/Reports";

const Wrapper: React.FC<RouteComponentProps<{}>> = () => {
  const loginState = useSelector<RootState, LoginState>((state) => state.login);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <Link to="/report/new">
          <Button
            style={{ float: "right", margin: "10px 10px" }}
            type="primary"
            ghost
          >
            Report Issue
          </Button>
        </Link>
      </div>
      {/* {loginState.loggedIn ? <ReportsMain /> : <Redirect to="/login" />} */}
      <ReportsMain />
    </div>
  );
};

export default Wrapper;
