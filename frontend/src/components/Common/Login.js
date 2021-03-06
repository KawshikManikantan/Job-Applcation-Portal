import React, {Component, useState} from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Cookies from 'js-cookie'
import Navbar from "../templates/Navbar";

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    // type:yup.string().required()
});

const Login = (props) => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
        reValidateMode: "onSubmit"
    });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [type, setType] = useState('');


    const onSubmit = async event => {
        const newUser = {
            email: email,
            password:password,
            // type:type
        }
        try {
            const res = await axios.post('http://localhost:4000/auth/login', newUser)
            console.log(JSON.stringify(res))
            Cookies.set('id', res.data.id)
            Cookies.set('userid', res.data.userid)
            Cookies.set('type', res.data.type)
            Cookies.set('prof_built', res.data.prof_built)
            console.log(typeof(res.data.prof_built))

            console.log(res.data.prof_built)
            console.log(res.data.type)
            console.log(typeof res.data.prof_built)
            if (res.data.prof_built==='false' && res.data.type === 'applicant') {
                return props.history.push('/profile')
            }

            if (res.data.prof_built==='false' && res.data.type === 'recruiter') {
                return props.history.push('/recruiter/profile')
            }

            if (res.data.type === 'applicant') {
                return props.history.push('/user/dash')
            }

            if (res.data.type === 'recruiter') {
                return props.history.push('/recruiter/dash')
            }

            // console.log(Cookies.get())
            setEmail('');
            setPassword('');
            // setType('Applicant');
            return false
        }catch(err){
            console.log(err.response.status)
            if(err.response.status===401)
            {
                alert('User not authenticated.Please try again')
                props.history.push('/login')
            }
            else
            {
                alert('Server Error')
            }
        }
    }
    return (
        <div>
            <Navbar type={"Common"}/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                           name="email"
                           placeholder="Email"
                           ref={register}
                           className="form-control"
                           value={email}
                           onChange={event =>{setEmail(event.target.value)}}/>
                    <p style={{ color:"red" }}>{errors.email?.message}</p>
                </div>
                <div className="form-group">
                    <label>Password (Minimum of 8 letters): </label>
                    <input type="password"
                           name="password"
                           placeholder="Password"
                           className="form-control"
                           value={password}
                           onChange={event => setPassword(event.target.value)}
                           ref={register}
                    />
                    <p style={{ color:"red" }}>{errors.password?.message}</p>
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}
export default Login
