import styled from "styled-components";

export const ProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px 20px;
`;

export const ProjectHeading = styled.div`
  display: flex;
  margin-bottom: 10px;
  div:nth-child(2) {
    margin-left: auto;
  }
`;

export const ChartsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  div {
    border-radius: 10px;
    flex: 1;
  }
`;
