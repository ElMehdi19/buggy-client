import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { RouteComponentProps, withRouter, NavLink } from "react-router-dom";
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
  SearchOutlined,
  BugOutlined,
  DownOutlined,
} from "@ant-design/icons";

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
            <SearchOutlined summary="Search" />
          </li>
          <li>
            <Notifications />
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
