import React, {Component, useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {classes} from "istanbul-lib-coverage";
import {Col, Row} from "react-bootstrap";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object().shape({
    rating: yup.number().integer().min(0).max(5).required(),
});

const Rate_Text = (props) =>{

    const[rating,setRating]=useState('')

    const onSubmit =async()=>
    {
        try{
            if(props.type==='Recruiter')
            {
                const res=await axios.post('http://localhost:4000/rate/applicant/new', {'recruiter':props.application.job.recruiter,'rating':rating,'applicant':props.application.applicant._id})
            }
            else{
                const res=await axios.post('http://localhost:4000/rate/jobs/new', {'job':props.application.job._id,'rating':rating,'applicant':props.application.applicant._id})
            }
            window.location.reload();
        }catch(err){
            console.log(err)
        }

    }
    const {register, handleSubmit, errors} = useForm({
        reValidateMode:"onSubmit",
        resolver: yupResolver(schema)
    });

    if(props.application.rating_details==='None')
    {
        return(
            <Row>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Col>
                        <input
                            id="rating"
                            name="rating"
                            placeholder="rating"
                            value={rating}
                            onChange={(event)=> {
                                console.log(rating)
                                event.persist()
                                setRating(event.target.value)
                            }}
                            ref={register}
                        />
                        <p style={{ color:"red" }}>{errors.rating?.message}</p>
                    </Col>
                    <Col>
                        <input type="submit" value="Rate" className="btn btn-primary"/>
                    </Col>
                </form>
                </Row>
            )
        }
        else
        {
            return(<div>Rated: {props.application.rating_details.rating}</div>)
        }
}
export default Rate_Text
