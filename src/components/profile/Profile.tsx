import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { ProfileWrapper } from "../../layout/Profile";
import { WHOAMI } from "../../gql/Queries";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";
import UserInfo from "./UserInfo";
import UserStats from "./UserStats";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};

const Profile: React.FC = () => {
  const loginState = useSelector<RootState, LoginState>((state) => state.login);
  const [success, setSuccess] = useState<boolean>(false);
  const { data, loading } = useQuery<{ whoami: UserType }>(WHOAMI, {
    onCompleted: () => setSuccess(true),
    onError: () => setSuccess(false),
  });
  console.log(loginState);

  return (
    <ProfileWrapper>
      <UserInfo />
      <UserStats />
    </ProfileWrapper>
  );
};

export default Profile;
