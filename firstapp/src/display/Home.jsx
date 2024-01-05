import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import FoodCard from '../components/FoodCard'
import Caurosel from '../components/Caurosel'

export default function Home() {

    const [search,setSearch] = useState("");
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async () => {
        let response = await fetch("http://localhost:2999/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        response = await response.json();
        //console.log(response[0],response[1])
        setFoodItem(response[0]);
        setFoodCat(response[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    const passFunc = function(updated){
        setSearch(updated);
    }

    return (
        <div>
            <div><Navbar /></div>
            <div><Caurosel passFunc={passFunc}/></div>
            <div className='container'>
                {
                    foodCat.length > 0
                        ? foodCat.map((data) => {
                            return (<div className='row mb-3'>
                                <div key={data._id} className='fs-3 m-3'>
                                {data.CategoryName}</div>
                                <hr />
                                {foodItem.length > 0
                                    ?
                                    foodItem
                                        .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filteredItems => {
                                            return (
                                                <div key={filteredItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <FoodCard foodItem = {filteredItems}
                                                    options={filteredItems.options[0]}/>
                                                </div>
                                            )
                                        })

                                    : <div>No Data Found</div>}
                            </div>)
                        }) : ""
                }
                
            </div>

        </div>
    )
}
