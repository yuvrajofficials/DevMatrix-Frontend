import React from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardHeader from './DashboardHeader';


const AddToCart = () => {
    const navigate = useNavigate();
    return (
        <>
            <DashboardHeader>
                <h1>
                    This is add  to cart
                </h1>
            </DashboardHeader>

        </>

    )
}

export default AddToCart


