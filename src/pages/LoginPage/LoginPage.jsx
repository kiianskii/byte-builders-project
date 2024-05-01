
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoginForm from "../../components/LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { signInThunk } from "../../redux/auth/operations";

export default function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleSubmit = async (data) => {
        try {
             dispatch(signInThunk(data));
           
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const initialValues = {
        email: '',
        password: '',
    };

    return (
        <LoginForm title='Login' onSubmit={handleSubmit} initialValues={initialValues} type='login'/>
    );
}
