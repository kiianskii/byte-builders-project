
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import LoginForm from "../../components/LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../redux/auth/operations";

export default function RegistrationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            const info = {
                username: data.username,
                email: data.email,
                password: data.password,
            }
         dispatch(registerThunk(info));
            navigate('/dashboard');
        } 
    };

    const initialValues = {
       username: '',
        email: '',
        password: '',
        confirmPassword: '',
      
    };

    return (
        <LoginForm type='register' onSubmit={handleSubmit} initialValues={initialValues} title='Register'/>
    );
}
