import styled from "styled-components";

export default styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #10185e;
  color: #f1f1f1;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  margin-bottom: 20px;
  z-index: 1;
  font-size: 1.2em;
`;

export const Nav = styled.nav`
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const NavItems = styled.ul`
  display: flex;
  list-style: none;
  gap: 20px;
  font-size: 1.2em;
  align-items: center;
`;
