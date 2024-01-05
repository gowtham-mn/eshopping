import React, { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'

export default function Signupform() {
  const [cred, setCred] = useState({ name: "", email: "", password: "", location: "" })
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:2999/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.location })
      });
      const json = await response.json();
      console.log(json.success);
      if (!json.success) {
        alert("Enter valid credentials");
      }else{
        navigate("/Login");
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
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={cred.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={cred.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">Address</label>
            <input type="text" className="form-control" id="address" name='location' value={cred.location} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to='/Login' className='m-3 btn btn-danger'>Already a User</Link>
        </form>
      </div>
    </>
  )
}
