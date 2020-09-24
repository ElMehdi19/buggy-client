import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";
import loginUser from "../../store/actions/authAction";
import { WHOAMI } from "../../gql/Queries";
import { LOGIN } from "../../gql/Mutations";
import { LOGIN_ERROR, LOGIN_SUCCESS } from "../../store/actions/constants";
import LoginForm from "./LoginForm";

type LoginMutationType = {
  login: {
    id: number;
    firstName: string;
    lastName: string;
  };
};

const Login: React.FC<RouteComponentProps<{}>> = ({ history }) => {
  const [success, setSuccess] = useState<boolean>(false);

  const loginState = useSelector<RootState, LoginState>((state) => state.login);
  const dipsatch = useDispatch();
  const [loginMutation, { data }] = useMutation<LoginMutationType>(LOGIN, {
    variables: { email: "", password: "" },
    onCompleted: ({ login }) =>
      dipsatch(loginUser({ type: LOGIN_SUCCESS, userId: login.id })),
    onError: ({ message }) =>
      dipsatch(loginUser({ type: LOGIN_ERROR, message })),
    refetchQueries: [{ query: WHOAMI }],
  });

  const handleSubmit = async (formValues: { [key: string]: string }) => {
    const values = formValues as { email: string; password: string };
    await loginMutation({ variables: { ...values } });
  };

  useEffect(() => {
    document.title = "Buggy - Login";
  }, []);

  useEffect(() => {
    setSuccess(loginState.loggedIn);
  }, [loginState]);

  useEffect(() => {
    if (success) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [success]);

  return <LoginForm handleSubmit={handleSubmit} />;
};

export default Login;
