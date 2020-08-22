import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { WHOAMI } from "../../gql/Queries";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";

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
  console.log(data);
  console.log(loginState);

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/add-report">New Report</Link>
      </div>
      <div>
        <span>
          {loading ? "Loading" : success ? data?.whoami.firstName : "error"}
        </span>
      </div>
    </div>
  );
};

export default Profile;
