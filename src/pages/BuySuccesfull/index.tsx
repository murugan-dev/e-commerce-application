// React and react related imports
import React, { useState, useEffect } from 'react';

// Third party libraries
import { useNavigate } from 'react-router-dom';

// custom component
import Header from '../Header/index.tsx';

//styles
import './styles.scss';

const BuySuccesfull = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(15); 
    const RedirectToHome = () => {
        navigate('/');
    };

    useEffect(() => {
        if (timeLeft === 0) {
            RedirectToHome();
            return;
        }
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft, navigate]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <Header />
            <div className='contents-container'>
                <p>Thanks for Purchasing with us</p>
                <p>Your product will be delivered within 4 business days</p>
                <button onClick={RedirectToHome}>Redirect to Home page</button>
                <div className='timer'>
                    <p>Redirecting in: {formatTime(timeLeft)}</p>
                </div>
            </div>
        </div>
    );
};

export default BuySuccesfull;