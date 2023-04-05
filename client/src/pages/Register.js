import React from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import {useDispatch} from 'react-redux'
import { hideLoading, showLoading } from "../redux/alertsSlice";

export default function Register() {
  const dispatch = useDispatch()
    const navigate = useNavigate()
  const onFinish = async (values) => {
    console.log("received values of form", values);
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/user/register", values);
      dispatch(hideLoading())
      if (res.data.success){
        toast.success(res.data.message);
        toast('Redirecting to login page')
        navigate('/login')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Nice to Meet You</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Button htmlType="submit" className="primary-button my-2">
            Register
          </Button>
          <Link to="/login" className="anchor">
            Click Here to Login
          </Link>
        </Form>
      </div>
    </div>
  )
  }
