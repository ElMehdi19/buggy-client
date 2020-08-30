import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

export const Sidebar = styled.div`
  position: fixed;
  top: 50px;
  right: 0px;
  width: 300px;
  height: 100vh;
  background: rgb(16, 24, 94);
  color: #fff;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  z-index: 1;
`;

export const CloseSidebar = styled(CloseOutlined)`
  align-self: flex-end;
  &:hover {
    cursor: pointer;
  }
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 0.7em;
`;
