import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { ProfileWrapper } from "../../layout/Profile";
import { WHOAMI } from "../../gql/Queries";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";
import UserInfo from "./UserInfo";
import UserStats from "./UserStats";
import { Redirect } from "react-router-dom";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  reportCount: number;
  fixedCount: number;
};

const Profile: React.FC = () => {
  const loginState = useSelector<RootState, LoginState>((state) => state.login);
  const [success, setSuccess] = useState<boolean>(false);
  const { data, loading } = useQuery<{ whoami: UserType }>(WHOAMI, {
    onCompleted: () => setSuccess(true),
    onError: () => setSuccess(false),
  });

  if (!loginState.loggedIn && !localStorage.getItem("userId")) {
    return <Redirect to="/login" />;
  }

  return (
    <ProfileWrapper>
      {!loading && data && (
        <>
          <UserInfo {...data.whoami} />
          <UserStats
            reportCount={data.whoami.reportCount}
            fixedCount={data.whoami.fixedCount}
          />
        </>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
