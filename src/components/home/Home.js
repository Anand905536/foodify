import React, { useState, useEffect } from 'react'
import Foodmap from './Foodmap'
import { Col, Row, Typography, Tooltip, Button, Space, Input, message } from 'antd'
import './home.css'
import poster from '../../assets/burger-5712704.jpg'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios'
import ReciepeDetail from '../ReciepeDetail/ReciepeDetail'


const { Title } = Typography
const Home = () => {
    const [dishName, setDishName] = useState("")
    const [food, setFood] = useState([])
    const [bool, setBool] = useState(true)
    const [recipe, setRecipe] = useState(false)
    // api response states
    const [id, setId] = useState("")

    const handler = async (e) => {
        try {
            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_key}&query=${dishName}`
                // `https://dummyjson.com/products`
            );
            const data = response.data;
            if(data.results.length>0){
                setFood(data.results);
            }
            else{
                message.error("type valid keywords")
            }
           
            // setFood(data.products)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        handler()
    }, [])

    return (
        <>
            <Row className='main-home-container'>
                <Title level={1}>
                    <img className='poster' src={poster} />
                </Title>
                <Row className="tag-line-searchbar" >
                    <Col>
                        <Title level={1} className='tag-line' style={{ color: "white" }}>
                            Search your Interest
                        </Title>
                    </Col>
                    <Col>
                        <Input style={{ textAlign: "center" }}
                            className='search-bar'
                            prefix={<SearchOutlined />}
                            placeholder="ingredients and receipes"
                            onChange={(e) => { setDishName(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    setRecipe(false); setBool(true);
                                    handler()
                                }
                            }}
                        />
                    </Col>
                </Row>
                <Button className="button" style={{ backgroundColor: "black" }} type="primary">Login</Button>
            </Row>


            {
                bool && !recipe && <Foodmap setId={setId} food={food} setBool={setBool} setRecipe={setRecipe} />
            }

            {
                recipe && !bool && <ReciepeDetail id={id} setBool={setBool} setRecipe={setRecipe} />
            }
        </>
    )
}
export default Home


