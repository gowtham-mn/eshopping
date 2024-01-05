import React, { useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import Badge from'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../display/cart';
import { useCart } from './ContextReducer';

export default function Navbar() {

    const [cartView,setCartView] = useState(false);
    let data = useCart();

    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("authToken");
        navigate("/Login");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MyFirstApp</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link activtoria-current-page active fs-5" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" to="/myOrder">My Orders</Link>
                                </li>
                                :""
                            }
                        </ul>
                        {!localStorage.getItem("authToken") ?
                        <div className='d-flex'>
                            <Link className="btn bg-white text-black mx-2" to="/Login">Login</Link>
                            <Link className="btn bg-white text-black mx-2" to="/Sign">SignUp</Link>
                        </div>
                        :
                        <div>
                            <div className='btn bg-white text-black mx-2' onClick={()=>{setCartView(true)}}> My Cart {" "}
                            {data.length===0?"":<Badge pill bg='danger'> {data.length} </Badge>}
                            </div>
                            {cartView? <Modal  onClose={()=>{setCartView(false)}}>{<Cart/>}</Modal> : null}
                            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}> Logout </div>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
