import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Joi from 'joi'
import "../Login/Login.modules.scss"
import loginImg from "../image/login.jpeg"
import logo from "../image/logo.png"
import axios from 'axios';

const Login = ({ UserData }) => {
    let navigate = useNavigate();
    const [errors,setErrors]=useState([])
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    function getUserData(e) {
        let User = { ...user };
        User[e.target.name] = e.target.value;
        setUser(User);

    }

    async function LoginData() {
        let { data } = await axios.post('https://route-egypt-api.herokuapp.com/signin', user);
        if (data.message === 'success') {
            setLoading(false);
            localStorage.setItem('userToken', data.token);
            UserData();
            navigate('/home');
            console.log(data);
        } else {
            setLoading(false);
            setError(data.message);
        }
    }
    function submit(e){
        setLoading(true)
       e.preventDefault();
      
      
      let validation= validate();
      if(validation.error){
        setLoading(false);
        setErrors(validation.error.details);
      
      }else{
        LoginData();
      }
      // console.log(validation);
      }

    function validate(){
        let scheme= Joi.object({
           email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
           password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
             'string.pattern.base':'invalid password'
           })
         })
        return scheme.validate(user ,{abortEarly:false});
       
       }


        return <>
            <section className='loginPage shadow-lg'>
                <div className="container ">
                    <div className="row ">
                        <div className=" col-md-6">
                            <img src={loginImg} alt="" className='w-100' />
                        </div>
                        <div className="col-md-6  ">

                            <div className="img-logo m-2">
                                <img src={logo} alt="" className='w-50' />
                            </div>
                            <h4 className='text-white'>Log in to GameOver</h4>
                            <form className='form-group m-2' onSubmit={submit}>
                            {error.length>0 ?<div className="alert text-black alert-danger">{error}</div>:''}
                                <label for="exampleFormControlInput1"  className="form-label"></label>
                                <input onChange={getUserData} name='email' type="email" className="form-control" id="exampleFormControlInput" placeholder="Enter Your Mail" />
                                <p className='text-danger'>{errors.filter((err)=> err.context.label=='email')[0]?.message}</p>
                                <label for="exampleFormControlInput1" className="form-label"></label>
                                <input onChange={getUserData} type="password" name='password' className="form-control" id="exampleFormControlInput1" placeholder="Enter Your Password" />

                                <p className='text-danger'>{errors.filter((err)=> err.context.label=='password')[0]?.message}</p>
                                <div className="btn-block">
                                    <button type="submit" className="login-btn btn-outline-info btn   my-3 w-100 ">{isLoading==true? <i className='fas fa-spinner fa-spin'></i> :'Login'}</button>
                                </div>

                                <div className="register my-2">
                                    <Link>Forgot Password?</Link>
                                    <p className='text-white'>Not a member yet? <Link>Create Account</Link></p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </section>


        </>;
    }

    export default Login;