import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Cookies from "js-cookie";
import Navbar from '../templates/Navbar'
import check_auth from "../Common/authentication";
import RateText from "../templates/RateText";


class Applications extends Component {

    constructor(props) {
        super(props);
        this.state = {applications: []};
        this.rating=this.rating.bind(this)
    }

    componentDidMount() {
        const loadData= async () =>{
            try {
                check_auth(this.props,'applicant')
                console.log("didmount")
                const res= await axios.post('http://localhost:4000/appl/user/all',{'userid':Cookies.get('userid')})
                console.log(res.data)
                this.setState({
                    applications:res.data
                })

            }catch(err){
                console.log(err)
            }
        }
        loadData().then()
    }

    rating(application){
        if(application.status!=='Accepted')
        {
            return(<div>N/A</div>)
        }
        else{
           return(<RateText application={application} type={"Applicant"}/>)
        }
}
    render() {
        return (
            <div>
                <Navbar type={"Applicant"}/>
                <br/>
                    <Grid item xs={12} md={9} lg={9}>
                        <Paper>
                            <Table size="large">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date of Joining</TableCell>
                                        <TableCell>Salary</TableCell>
                                        <TableCell>Recruiter</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.applications.map((application,ind) => (
                                        <TableRow>
                                            <TableCell>{application.job.title}</TableCell>
                                            <TableCell>{(application.status==='Accepted')? application.date_accept:'N/A'}</TableCell>
                                            <TableCell>{application.job.salary}</TableCell>
                                            <TableCell>{application.job.recruiter.name}</TableCell>
                                            <TableCell>{application.status}</TableCell>
                                            <TableCell>{this.rating(application)}</TableCell>
                                        </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
            </div>
        )
    }
}

export default Applications;
