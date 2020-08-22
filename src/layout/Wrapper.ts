import styled from "styled-components";

export default styled.div`
  display: flex;
  height: 100vh;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

export const ReportWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
`;
