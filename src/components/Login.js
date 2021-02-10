import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";

const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onSubmit = (e) => {
        console.log(email)
        e.preventDefault();
        axios.post('/api/auth/authenticate', {
                email: email,
                password: password    
        }, {
            withCredentials: true
        }).then(response => {
            if (response.status === 200) {
                console.log('approved');
                // console.log(response.data.token);
                props.history.push('/dashboard');
            } else {
                console.log("incorrect");
                setError("Incorrect email/password");
                const error = new Error(response.error);
                throw error;
            }
        }).catch(error => {
            console.log(error);
        })
    }

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        if (name === 'email') {
            setEmail(value)
        } else {
            setPassword(value)
        }
    }

    return (
        <React.Fragment>
        <h1 className="mt-5 mb-5 text-center">Login</h1>
        <form className="container" onSubmit={onSubmit}>
                    {error==="Incorrect email/password" ?
                        <div className="alert alert-danger" role="alert">
                            This is a danger alert—check it out!
                        </div>
                        :
                        <div></div>
                    }
            <div className="row h-100">
            <div className="form-group col-md-6">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={handleInputChange} name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group col-md-6">
                <label for="exampleInputPassword1">Password</label>
                <input onChange={handleInputChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </React.Fragment>
    );
};

export default Login;