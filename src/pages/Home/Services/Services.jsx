import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";


const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:5000/services')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setServices(data);
        })
    },[])
    return (
        <div className="mt-4">
            <div className="text-center">
                <h3 className="font-bold text-orange-600 text-2xl mt-6 mb-4">Popular Products</h3>
                <h1 className="text-5xl font-bold mb-4 p-4">Browse Our Products</h1>
                <p className="pb-4 mb-4">the majority have suffered alteration in some form, by injected humour, or randomised <br /> words which do not look even slightly believable. </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    services.map(service=> <ServiceCard key={service._id} service={service}></ServiceCard> )
                }
            </div>
        </div>
    );
};

export default Services;