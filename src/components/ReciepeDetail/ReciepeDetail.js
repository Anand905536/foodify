import React, { useState, useEffect } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Tooltip, Button, Space, Input } from 'antd'
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import './reciepeDetail.css'

const { Title } = Typography
const ReciepeDetail = ({ setBool, setRecipe, id }) => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

    useEffect(() => {
      const fetchDetails = async () => {
          const data = await fetch
          (`https://api.spoonacular.com/recipes/${3}/information?apiKey=${process.env.REACT_APP_API_key}`);
          const detailData = await data.json();
          setDetails(detailData);
          // console.log(detailData);
      }
      fetchDetails();
  }, [id]);

  return (
    <>
      <Tooltip title="Back to Listing Page">
        <ArrowLeftOutlined
          style={{ fontSize: '30px' }}
          className='back-icon'
          onClick={() => { setRecipe(false); setBool(true) }} />
      </Tooltip>

      <Col
       className='detail-wrapper'
      >
        <div>
          <h2>{details.title}</h2>
          <img width={350} src={details.image} alt="" />
        </div>

        <div>
          <Button className={activeTab === 'instructions' ? 'active' : ''} onClick={() => setActiveTab("instructions")}>
            Instructions
          </Button>
          <Button className={activeTab === 'ingredients' ? 'active' : ''} onClick={() => setActiveTab("ingredients")}>
            Ingredients
          </Button>
          {activeTab === 'instructions' && (
            <div>
              <h3 className="summary" dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <ul>
              {details.extendedIngredients.map((ingredients) =>
                <li key={ingredients.id}>{ingredients.original}</li>
              )}
            </ul>
          )}
          </div>
      </Col>
    </>
  )
}


// const Button = styled.button`
//     padding: 1rem 2rem;
//     color: #313131;
//     background: white;
//     border: 2px solid black;
//     margin-right: 2rem;
//     font-weight: 600;
// `


export default ReciepeDetail