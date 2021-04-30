import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import Navbar from "../templates/Navbar";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";
import check_auth from "../Common/authentication";

function User_Dash(props) {
    check_auth(props,'applicant')
    const [userdetails,setDetails]=useState('{}')
    useEffect(() => {
        const loadData= async () =>{
            try {
                console.log("didmount")
                const res = await axios.post('http://localhost:4000/profile/applicant/me', {'userid':Cookies.get('userid')})
                console.log(JSON.stringify(res))
                console.log(res.data._id)
                setDetails(res.data)
            }catch(err){
                console.log(err)
            }
        }
        loadData().then()
    }, []);

    return (
        <div>
            <Navbar type={"Applicant"}/>
            <h1> Welcome {userdetails.name}</h1>
            <Link className={"card-link"} to={{
                pathname: '/user/edit',
                state: userdetails
            }}>
            <button type="button" className="btn btn-outline-primary">View/Edit Profile</button>
            </Link>
        </div>
    )

}

export default User_Dash
