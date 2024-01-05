import React, { useState, useRef, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function FoodCard(props) {

    let dispatch = useDispatchCart();
    let data = useCart();

    let priceRef = useRef();

    let options = props.options;
    let priceOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleClick = async () => {

        let food = undefined
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }

        if (food !== undefined) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {

                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
                //await console.log(data);
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });

    }

    

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, [])

    return (
        <div className="card m-3" style={{ width: "18rem", backgroundColor: "#395B64" }}>
            <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "140px", objectFit: "cover" }} />
            <div class="card-body">
                <h5 className='crad-title'>{props.foodItem.name}</h5>
                <p class="card-text">Food is good</p>
                <div className='container w-100'>
                    <select className='m-1 h-100 rounded ' onChange={(e) => setQty(e.target.value)}>
                        {Array.from(Array(6), (e, i) => {
                            return (
                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                            )
                        })}
                    </select>
                    <select className='m-1 h-100 rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                        {priceOptions.map((data) => {
                            return (<option key={data} value={data}>{data}</option>)
                        })}
                    </select>
                    <div className='m-1 h-100 d-inline'>
                    ₹{finalPrice}/-
                    </div>
                    <hr></hr>
                    <button className='btn btn-success justify-content-center  ms-2' onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}
