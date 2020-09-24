import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import {
  RouteComponentProps,
  withRouter,
  NavLink,
  Redirect,
} from "react-router-dom";
import { PROJECTS } from "../../gql/Queries";
import { LOGOUT } from "../../gql/Mutations";
import loginAction from "../../store/actions/authAction";
import { LOGOUT_SUCCESS } from "../../store/actions/constants";
import Header, { Nav, NavItems } from "../../layout/Header";
import Notifications from "../notifications/Notifications";
import { Menu, Dropdown } from "antd";
import {
  LogoutOutlined,
  SettingOutlined,
  BugOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";

type Project = { id: number; name: string };

const ProjectsMenu: React.FC = () => {
  const { loading, data } = useQuery<{ projects: Project[] }>(PROJECTS);
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    if (!loading && data) {
      setProjects(data.projects);
    }
  }, [loading, data]);
  const renderProjects = projects.map((project) => (
    <Menu.Item key={project.id}>
      <NavLink to={`/projects/${project.id}`}>{project.name}</NavLink>
    </Menu.Item>
  ));
  return <Menu>{renderProjects}</Menu>;
};

const Navbar: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const loginState = useSelector<RootState, LoginState>((state) => state.login);
  const dispatch = useDispatch();
  const [logoutMutation] = useMutation(LOGOUT, {
    onCompleted: () => dispatch(loginAction({ type: LOGOUT_SUCCESS })),
  });
  if (!loginState.loggedIn && !localStorage.getItem("userId")) {
    return <Redirect to="/login" />;
  }
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
          <li>
            <Dropdown overlay={<ProjectsMenu />}>
              <div style={{ cursor: "pointer" }}>
                <span style={{ marginRight: "6px" }}>Projects</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </li>
        </NavItems>
        <NavItems>
          <li>
            <Notifications />
          </li>
          <li>
            <NavLink to="/profile">
              <SettingOutlined />
            </NavLink>
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
