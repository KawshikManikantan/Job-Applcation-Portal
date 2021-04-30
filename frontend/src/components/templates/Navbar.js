import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

export default class NavBar extends Component {
    
    constructor(props) {
        super(props);
        this.commonnavelements=[

            {
                link:'/',
                title:"Home"
            },

            {
                link:"/register",
                title:"Register"
            },
            {
                link:"/login",
                title:"Login"
            }
        ]

        this.applicantnavelements=[

            {
                link:{
                    pathname:"/user/dash"
                },
                title:"DashBoard"
            },

            {
                link:{
                    pathname:"/user/jobs",
                    // state:userdetails
                },
                title:"Jobs"
            },

            {
                link:{
                    pathname:"/user/applications",
                    // state:userdetails
                },
                title:"Applications"
            },

            {
                link:{
                    pathname:"/logout"
                },
                title:"LogOut"
            },
        ]

        this.recruiternavelements=[
            {
                link:{
                    pathname:"/recruiter/dash",
                },
                title:"Dashboard"
            },

            {
                link:{
                    pathname:"/recruiter/job",
                },
                title:"Create New"
            },

            {
                link:{
                    pathname:"/recruiter/list",
                    // state:userdetails
                },
                title:"Jobs"
            },

            {
                link:{
                    pathname:"/recruiter/accepted",
                    // state:userdetails
                },
                title:"Recruited"
            },

            {
                link:{
                    pathname:"/logout"
                },
                title:"LogOut"
            }
        ]
    }
    render() {
        let array=[]
        if(this.props.type==='Common')
        {
            array=this.commonnavelements
        }
        else if(this.props.type==='Applicant')
        {
            array=this.applicantnavelements
        }
        else if(this.props.type==='Recruiter')
        {
            array=this.recruiternavelements
        }
        const listItems = array.map((element) =>
            <li className="navbar-item">
                <Link to={element.link} className="nav-link">{element.title}</Link>
            </li>
        );
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {listItems}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}
