import React,{useState} from 'react';
import authService from '../appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import {Button,Input,Logo} from './index'
import { UseDispatch, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup(props) {
    const navigate = useNavigate()
    const[error,setError] = useState("")
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()
    const create = async(data) =>{
        setError("")
        try {
            
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div>
            
        </div>
    );
}

export default Signup;