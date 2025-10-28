import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../../api/users";

const Register = () => {
  const onFinish = async (values) => {
    try {
      const res = await RegisterUser(values);
      if (res.success) {
        message.success(res.message || "Registration successful!");
      } else {
        message.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <main className="App-header">
      <h1>Register</h1>
      <section className="mw-500 text-center px-3">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" size="large">
              Register
            </Button>
          </Form.Item>
        </Form>

        <p>
          Have an account?{" "}
          <Link to="/login" style={{ color: "#1677ff" }}>
            Login Here
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Register;
