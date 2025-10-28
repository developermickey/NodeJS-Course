import React from "react";
import { Button, Form, Input, message } from "antd";
import { LoginUser } from "../../api/users";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await LoginUser(values);

      if (res && res.success) {
        message.success(res.message || "Login successful!");
        localStorage.setItem("token", res.data);
        navigate("/");
      } else {
        message.error(res?.message || "Login failed");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Server error");
    }
  };
  return (
    <>
      <main className="App-header">
        <h1>Login</h1>
        <section className="mw-500 text-center px-3">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              htmlFor="email"
              name="email"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: "Email is required",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
                },
              ]}
            >
              <Input id="email" type="email" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              htmlFor="password"
              name="password"
              className="d-block"
              rules={[
                {
                  required: true,
                  message: "Password is required",
                },
              ]}
            >
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                block
                htmlType="submit"
                style={{ fontSize: "1.1rem" }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <p>
            Don't have an account? <Link to="/register">Register Here</Link>
          </p>
        </section>
      </main>
    </>
  );
};

export default Login;
