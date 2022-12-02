import React,{useState , useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import loginImg from "../image/login.jpeg"
import './Register.modules.scss'

const Register = () => {

    let [user,setUser] = useState({
        first_name:'',
  last_name:'',
  age:0,
  email:'',
  password:''

    })
    function getUserData(e)
    {
       let currentUser = {...user};
       currentUser[e.target.name] = e.target.value;
       setUser(currentUser)
    }

    async function register(e)
    {
        e.preventDefault()
        let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup',user)
               console.log(data);  
    }
    useEffect(() => {
        console.log(user);
    }, [user])
    return <>
        <section className='registerPage shadow-lg'>
            <div className="container ">
                <div className="row ">
                    <div className=" col-md-6">
                        <img src={loginImg} alt="" className='w-100' />
                    </div>
                    <div className="col-md-6 pt-4 ">
                        <h4 className='text-white'>Creat my account</h4>
                        <form className="row ">
                            <div className="col-md-6">
                                <label for="inputFName4" className="form-label"></label>
                                <input type="text" name='first_name' onChange={(e)=>getUserData(e)} className="form-control" id="inputFName4" placeholder='First Name'/>
                            </div>
                            <div className="col-md-6">
                                <label for="inputSName4" className="form-label"></label>
                                <input type="text" name='last_name' onChange={(e)=>getUserData(e)} className="form-control" id="inputSName4" placeholder='Last Name'/>
                            </div>
                            <div className="col-12">
                                <label for="inputEmail" className="form-label"></label>
                                <input type="email" name='email' onChange={(e)=>getUserData(e)} className="form-control" id="inputEmail" placeholder="Email"/>
                            </div>
                            <div className="col-12">
                                <label for="inputAge" className="form-label"></label>
                                <input type="number" name='age' onChange={(e)=>getUserData(e)} className="form-control" id="inputAge" placeholder="Age  "/>
                            </div>
                            <div className="col-12">
                                <label for="inputpassword" className="form-label"></label>
                                <input type="password" name='password' onChange={(e)=>getUserData(e)} className="form-control" id="inputpassword" placeholder="New Password"/>
                            </div>
                           
                            <div class="col-12 mt-3 creat">
                                <button onClick={(e)=>register(e)} type="submit" className="btn text-info w-100">Creat account</button>
                            </div>

                            <p className='line'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
                            <p className='mb-4'>already login? <Link>login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </section>


    </>;
}


export default Register;