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
  /* display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center; */
  .profile-heading {
    gap: 30px;
    display: flex;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 4px solid #f1f1f1;
    div:nth-child(2) {
      flex: 2;
      align-self: center;
      margin-right: auto;
    }

    .image-upload {
      flex: 1;
      text-align: center;
    }

    .image-upload img {
      box-sizing: border-box;
      width: 80%;
      height: 80%;
      border-radius: 50%;
      &:hover {
        cursor: pointer;
        filter: blur(2px);
      }
    }
  }

  section:nth-child(2) {
    margin: 10px 20px 50px 20px;
    input {
      border-radius: 5px;
      margin-bottom: 10px;
      color: #000;
    }
    button {
      float: right;
      background: #1890ff;
      color: #fff;
      border: none;
      font-size: 1.1rem;
      padding: 5px;
      cursor: pointer;
      border-radius: 5px;
    }
  }
`;

export const UserStatsWrapper = styled.div`
  grid-area: STATS;
  background: #fff;
  border-radius: 10px;
`;
