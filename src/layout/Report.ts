import styled from "styled-components";

export const Card = styled.div`
  width: 100%;
  grid-column: span 3;
  border: 1px solid rgb(240, 240, 240);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

export const CardTitle = styled.div`
  grid-column: span 4;
  display: flex;
  flex-wrap: wrap;
`;

export const CardTitleImg = styled.img`
  flex: 1;
  width: 10px;
  height: 40px;
  border-radius: 50%;
`;

export const CardTitleText = styled.div`
  flex: 2;
`;
