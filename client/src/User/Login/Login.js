import axios from "axios";
import React, { useState } from "react";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {
  const [FailedLogin, setFailedLogin] = useState(false);
  const [SuccessLogin, setSuccessLogin] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);  
  function HandleSubmit(evt) {
    evt.preventDefault();
    axios.post("/users/signin", values).then((res) => {
      if (res.status === 201) {
        setSuccessLogin(true);
        setCurrentUser(res.data);
        navigate('/');
        return true;
      }
    }).catch(function(error){
      setFailedLogin(true);
      return false;
    });
    return false;
  }
  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  }
  return (
    <div>
      <div className="container mt-2 d-flex justify-content-center">
        <div className="col-lg-8 bg-light m-5 p-3">

          <form
            onSubmit={(evt) => {
              HandleSubmit(evt);
            }}
          >
            <h1 className="text-center display-2">Login</h1>
            {
              FailedLogin?<div className="alert alert-danger my-3 text-center" role="alert">
                Login Failed! Please check your username/password.
              </div>:null
            }
            {
              SuccessLogin?<div className="alert alert-success my-3 text-center" role="alert">
                Login Successful!
              </div>:null
            }
            
            <div className="mb-1">
              <p>
                Username:
                <input
                  onChange={(evt) => {
                    handleChange(evt);
                  }}
                  type="text"
                  name="username"
                  className="form-control"
                  id="username"
                  required
                />
              </p>
            </div>
            <div className="mb-1">
              <p>
                Password:
                <input
                  onChange={(evt) => {
                    handleChange(evt);
                  }}
                  type="password"
                  name="password"
                  className="form-control"
                  id="password"
                  required
                />
              </p>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary m-2">
                Login
              </button>
              <Link to="/user/new" className="btn btn-danger m-2">
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
