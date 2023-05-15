import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";


const BookService = () => {
    const service = useLoaderData();
    const { title, _id ,price, img} = service;
    const {user} = useContext(AuthContext);
    
    const handleBookService = event =>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const amount = form.amount.value;

        const booking = {
            customerName:name,
            email,
            date,
            img,
            service:title,
            service_id: _id,
            price:price,
            amount:amount,
        }
        console.log(booking);

        fetch('http://localhost:5000/bookings', {
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=> {
            console.log(data)
        })
    }
    return (
        <div>
            <h1 className="text-center text-3xl">Book service: {title}</h1>
            <form onSubmit={handleBookService}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">total amount dew</span>
                        </label>
                        <input type="text" name="amount" defaultValue={'$' + price} className="input input-bordered" />
                    </div>
                </div>
                <div className="form-control mt-6">
                    <input className="btn btn-primary btn-block" type="submit" value="Order Confirm" />
                </div>
            </form>
            <div className="card-body">
            </div>
        </div>
    );
};

export default BookService;