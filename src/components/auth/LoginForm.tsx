import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers/rootReducer";
import { LoginState } from "../../store/reducers/authReducer";
import { Form, Input, Button, Checkbox, Alert } from "antd";
import { UserOutlined, LockOutlined, BugOutlined } from "@ant-design/icons";
import Wrapper from "../../layout/Wrapper";

type Props = {
  handleSubmit: (formValues: {}) => void;
};

const LoginForm: React.FC<Props> = ({ handleSubmit }) => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const loginState = useSelector<RootState, LoginState>((state) => state.login);
  useEffect(() => {
    setError(loginState.loginError);
  }, [loginState]);
  const onFinish = (values: { [key: string]: string }) => {
    handleSubmit(values);
    setPassword("");
  };

  return (
    <Wrapper>
      <div>
        <h1 style={{ color: "#10185e" }}>
          <BugOutlined />
        </h1>
      </div>
      {error && (
        <div>
          <Alert
            type="error"
            message="Error"
            description={error}
            showIcon
            closable
          />
        </div>
      )}
      <Form
        style={{ width: 400 }}
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email Address"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="/">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item style={{ display: "flex" }}>
          <Button
            style={{ width: "50%", margin: "0 auto", display: "block" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default LoginForm;
