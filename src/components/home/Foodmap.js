import React, { useState, useEffect } from 'react';
import { Grid, Card, Row, Button, Tooltip, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './foodmap.css';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';


const Foodmap = ({ food, setBool, setRecipe, setId }) => {
    const [btnStates, setBtnStates] = useState([]);
    const [favoriteItems, setFavoriteItems] = useState([]);
    const navigate = useNavigate()





    useEffect(() => {
        if (food && food.length > 0) {
            // Initialize btnStates based on the length of food
            setBtnStates(new Array(food.length).fill(false));
        }
    }, [food]);

    const handleAddToFavorite = async (index) => {
        const newBtnStates = [...btnStates];
        newBtnStates[index] = !newBtnStates[index];
        setBtnStates(newBtnStates);

        if (newBtnStates[index]) {
           setFavoriteItems((prevFavoriteItems) => [...prevFavoriteItems, food[index]]);
        }
        message.success("Added to the favorite list")
    };

    useEffect(() => {
        if(favoriteItems.length>0){
            localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
        }
    }, [favoriteItems]);

    return (
        <>
            <div className="icon-container">
                <Button className='btn-favorite' style={{ backgroundColor: "black", color: "white" }}
                    onClick={() => navigate('/favorite-reciepe')}
                >Go to favorite list</Button>
            </div>

            <Row style={{
                display: "flex", justifyContent: "space-evenly",
                marginTop: "50px", marginLeft: "100px", marginRight: "100px"
            }}>
                {food && food.length > 0 && food.map((data, index) => {
                    return (
                        <Card className='main-image-card' style={{cursor:"pointer"}} key={index}>
                            <img width="350" className="card-image" src={data.image} alt="not shown"
                                onClick={() => { setRecipe(true); setBool(false); setId(index) }}
                            />
                            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                                <h4 className='card-font' onClick={() => { setRecipe(true); setBool(false); setId(index) }}>{data.title}</h4>
                                <Button className="btn" style={{ backgroundColor: btnStates[index] ? "green" : "black" }} type="primary"
                                    onClick={() => handleAddToFavorite(index)}
                                >
                                    {btnStates[index] ? "Added" : "Add to favorite"}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </Row>
        </>
    );
};

export default React.memo(Foodmap);
