import React from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
import { LOGOUT } from "../../gql/Mutations";
import loginAction from "../../store/actions/authAction";
import { LOGOUT_SUCCESS } from "../../store/actions/constants";
import Header, { Nav, NavItems } from "../../layout/Header";
import {
  LogoutOutlined,
  SettingOutlined,
  SearchOutlined,
  BugOutlined,
  BellOutlined,
} from "@ant-design/icons";

const Navbar: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const dispatch = useDispatch();
  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => dispatch(loginAction({ type: LOGOUT_SUCCESS })),
  });

  const handleLogout = async () => {
    await logoutMutation();
    history.push("/login");
  };
  return (
    <Header>
      <Nav>
        <NavItems>
          <li>
            <NavLink to="/">
              <BugOutlined />
            </NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>Reports</li>
        </NavItems>
        <NavItems>
          <li>
            <SearchOutlined summary="Search" />
          </li>
          <li>
            <BellOutlined />
          </li>
          <li>
            <SettingOutlined />
          </li>
          <li>
            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <LogoutOutlined />
            </button>
          </li>
        </NavItems>
      </Nav>
    </Header>
  );
};

export default withRouter(Navbar);
