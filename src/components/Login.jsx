import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice';
import {Button,Input,Logo} from './index'
import { UseDispatch, useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {set, useForm} from 'react-hook-form'

function Login(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const [error,setError] = useState('')
    const login = async(data) =>{
        setError("")
        try {
            const session =  await authService.loginIn(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div></div>
    );
}

export default Login;