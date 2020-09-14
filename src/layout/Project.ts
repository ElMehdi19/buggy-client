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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 200px);
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
  div {
    border-radius: 10px;
    &:nth-child(1) {
      grid-column: 1/3;
      grid-row: 1/3;
    }
  }
`;

export const FixersWrapper = styled.div`
  background: #fff;
  padding: 20px;
  grid-column: 4/5;
  li {
    display: flex;
    margin: 10px 0;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex: 1;
  }
`;
