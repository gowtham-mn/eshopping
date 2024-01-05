import React,{useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  const [cred, setCred] = useState({email: "", password: ""})
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2999/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: cred.email, password: cred.password })
      });
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      }else{
        localStorage.setItem("userEmail",cred.email);
        localStorage.setItem("authToken",json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }


  }

  const onChange = (e) => {
    //setCred({...cred,[e.target.name]:e.target.value})
    setCred((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  return (
    <>
      <div className='container mt-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/Sign' className='m-3 btn btn-danger'>I'm a new user</Link>
        </form>
      </div>
    </>
  )
}
