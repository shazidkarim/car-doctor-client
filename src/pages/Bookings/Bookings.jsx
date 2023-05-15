
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";


const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useContext(AuthContext);
    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [url]);

    const handleDelete = (id) =>{
        const proceed = confirm('are you sure?')
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`,{
                method: 'DELETE'

            })
            .then(res=>res.json())
            .then(data=>{
                console.log(data)
                if(data.deletedCount>0){
                    alert('deleted successfull')
                    const remaining = bookings.filter(booking=>booking._id !== id);
                    setBookings(remaining);
                }
            })
        }
    }
    const handleConfirm = (id)=>{
        fetch(`http://localhost:5000/bookings/${id}`,{
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({status:'confirm'})
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.modifiedCount>0){
                // update state
                const remaining = bookings.filter(booking=>booking._id !== id);
                const updated = bookings.find(booking=>booking._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBookings(newBookings)
            }
        })
    }

    return (
        <div>
            <h2 className="text-5xl text-center">Your bookings: {bookings.length}</h2>
            \<div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>service img</th>
                            <th>service name</th>
                            <th> email</th>
                            <th>price</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                     {
                        bookings.map(booking=> <BookingRow key={booking._id} booking={booking} handleDelete={handleDelete} handleConfirm={handleConfirm}></BookingRow> )
                     }
                    </tbody>
                   
                </table>
            </div>
        </div>
    );
};

export default Bookings;