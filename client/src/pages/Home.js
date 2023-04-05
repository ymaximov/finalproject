import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { Row, Col } from "antd";
import Doctor from "../components/Doctor";
import {showLoading, hideLoading} from '../redux/alertsSlice'

export default function Home() {
  const dispatch = useDispatch()
  const [doctors, setDoctors] = useState([])
  const getData = async () => {
    try {
      const res = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data)
      dispatch(setUser(res.data.data))
      
    } catch (error) {
      console.log(error);
    }
  };

  const getHomePageData = async () => {
    try {
      dispatch(showLoading)
      const res = await axios.get(
        "/api/user/get-all-approved-doctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading())
      if(res.data.success){
        setDoctors(res.data.data)
        console.log(res.data.data)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    getHomePageData()
  }, []);

  return (
    <Layout>
      <h1>Doctors</h1>
      <h6>Click to schedule appointment</h6>
      <Row gutter={20}>
        {doctors.map((doctor) => (
         <Col span={8} xs={24} sm={24} lg={8}>
          <Doctor doctor={doctor} />
         </Col> 
        ))}
      </Row>
    </Layout>
  );
}
