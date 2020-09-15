import styled from "styled-components";

export const ProfileWrapper = styled.main`
  padding: 20px;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 1fr) 2fr;
  grid-template-rows: minmax(auto, max-content);
  grid-template-areas:
    "INFO INFO INFO STATS"
    "INFO INFO INFO STATS"
    "INFO INFO INFO STATS"
    "INFO INFO INFO STATS";
`;

export const UserInfoWrapper = styled.div`
  grid-area: INFO;
  background: #fff;
  border-radius: 10px;
`;

export const UserStatsWrapper = styled.div`
  grid-area: STATS;
  background: #fff;
  border-radius: 10px;
`;
