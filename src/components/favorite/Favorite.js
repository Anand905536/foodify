import React, { useState, useEffect } from 'react'
import { Col, Row,Card, Typography, Tooltip, Button, Space, Input } from 'antd'
import './favorite.css'
import poster from '../../assets/burger-5712704.jpg'
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios'
import ReciepeDetail from '../ReciepeDetail/ReciepeDetail'
import { Navigate, useNavigate } from 'react-router-dom';


const { Title } = Typography
const Favorite = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteItems')) || [];
    console.log(savedFavorites)
    setFavoriteItems(savedFavorites);
  }, []);


  return (
    <>
     <Tooltip title="Back to Listing Page">
        <ArrowLeftOutlined
          style={{ fontSize: "30px" }}
          className='back-icon'
          onClick={() => navigate("/")} />
      </Tooltip>

      <Col style={{ textAlign: "center" }}>
        <Title level={1} className='favorite-heading' style={{ marginTop: "20px", color: "white", color: "black" }}>
          My favorite Dishes
        </Title>

        <Row style={{
          display: "flex", justifyContent: "space-evenly",
          marginTop: "50px", marginLeft: "100px", marginRight: "100px"
        }}>
          {favoriteItems && favoriteItems.length > 0 && favoriteItems.map((data, index) => {
            return (
              <Card className='main-image-card' key={index}>
                <img width="350" className="card-image" src={data.image} alt="not shown" />
                <h4 className='card-font' >{data.title}</h4>
              </Card>
            );
          })}
        </Row>
      </Col>
    </>
  )
}

export default Favorite