import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import {TextareaAutosize} from "@material-ui/core";
import Cookies from 'js-cookie';
import check_auth from "../Common/authentication";
import Navbar from "../templates/Navbar";


const schema = yup.object().shape({
    name:yup.string().required(),
    contact:yup.number().integer().positive().max(9999999999).required(),
    bio:yup.string().max(250).required()
});


const Profile_Recruiter = (props) => {

    useEffect(() => {
        check_auth(props,'recruiter')
        console.log(Cookies.get('profile_built'))
        if(typeof props.location.state === "undefined" && Cookies.get('prof_built')==='true')
        {
            alert('Page exists only for profile building')
            return props.history.push('/recruiter/dash')
        }

    }, []);
    
    const {register, handleSubmit, errors} = useForm({
        reValidateMode:'onSubmit',
        mode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const email=Cookies.get('userid')


    // console.log(typeof props.location.state.name)
    const [name, setName] = useState((typeof props.location.state==='undefined')? '':props.location.state.name);
    const [contact,setContact]=useState((typeof props.location.state==='undefined')? '':props.location.state.contact);
    const [bio,setBio]=useState((typeof props.location.state==='undefined')? '':props.location.state.bio)

    const onSubmit = async event => {
        const details={
            'name':name,
            'email':email,
            'contact':contact,
            'bio':bio
        }
        try {
            if(typeof props.location.state !== "undefined")
            {
                const res = await axios.put('http://localhost:4000/profile/recruiter', details)
                console.log(res)
            }
            else{
                const res = await axios.post('http://localhost:4000/profile/recruiter', details)
                const res1=await axios.post('http://localhost:4000/auth/modify',{email:Cookies.get('userid')})
                Cookies.set('prof_built',true)
                console.log(res)
            }
            setName('')
            setContact('')
            setBio('')
            props.history.push('/recruiter/dash')
            return false
        }catch(err){
            console.log(err)
        }
    }

    // function handleRemove(i) {
    //     setDetails({...details,"education": details.education.splice(i,1)});
    // }

    const nav=()=> {
        console.log(typeof Cookies.get('prof_built'))
        if (Cookies.get('prof_built') === false) {
            return (<br/>)
        }
        else {
            return (<Navbar type={"Recruiter"}/>)
        }
    }

    return (
        <div>
            {nav}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="text"
                           name="email"
                           placeholder="email"
                           value={email}
                           className="form-control"
                           readOnly={true}/>
                </div>
                <div className="form-group">
                    <label>Name: </label>
                    <input type="text"
                           name="name"
                           className="form-control"
                           placeholder="Name"
                           value={name}
                           onChange={event => setName(event.target.value)}
                           ref={register}
                    />
                    <p style={{ color:"red" }}>{errors.name?.message}</p>
                </div>

                <div className="form-group">
                    <label>Contact: </label>
                    <input type="text"
                           name="contact"
                           placeholder="Contact Number"
                           className="form-control"
                           value={contact}
                           onChange={event => setContact(event.target.value)}
                           ref={register}
                    />
                    <p style={{ color:"red" }}>{errors.contact?.message}</p>
                </div>

                <div className="form-group">
                    <label>Bio: </label>
                    <TextareaAutosize
                        name="bio"
                        aria-label="empty textarea"
                        className="form-control"
                        placeholder="Bio"
                        value={bio}
                        onChange={event => setBio(event.target.value)}
                        ref={register}
                    />
                    <p style={{ color:"red" }}>{errors.bio?.message}</p>
                </div>

                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
}
export default Profile_Recruiter
