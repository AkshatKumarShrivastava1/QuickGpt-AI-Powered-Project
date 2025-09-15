
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '../pages/Loading';
import { useAppContext } from '../context/AppContext';

const Success = () => {
    const navigate = useNavigate();
    const { fetchUser, token } = useAppContext();

    useEffect(() => {
        toast.success("Payment successful! Updating your credits...", { duration: 5000 });

        const timer = setTimeout(() => {
            fetchUser(token); 
            navigate('/'); 
        }, 3000); 

        return () => clearTimeout(timer);

    }, [navigate, fetchUser, token]);

    return <Loading />;
};

export default Success;