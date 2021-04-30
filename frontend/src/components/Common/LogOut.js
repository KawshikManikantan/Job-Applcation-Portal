import React, {Component, useEffect, useState} from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Cookies from 'js-cookie'
import Navbar from "../templates/Navbar";

const LogOut = (props) => {
    useEffect(() => {
        Cookies.remove('id');
        Cookies.remove('userid');
        Cookies.remove('type');
        Cookies.remove('prof_built')
        props.history.push('/')
    }, []);
    return null
}
export default LogOut
