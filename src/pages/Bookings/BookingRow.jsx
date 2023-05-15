/* eslint-disable no-unused-vars */


const BookingRow = ({ booking, handleDelete,handleConfirm}) => {
    const { _id,customerName, email, service, date, amount, status} = booking;

 
    return (
        <tr>
            <th>
                <button onClick={()=>{handleDelete(_id)}} className="btn btn-circle btn-outline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
            </th>
            <td>

                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td>{email}</td>
            <td>{amount}</td>
            <th>
                { status === 'confirm'? 
                <span className="fort-bold text-primary">Confirmed</span>
                :
                    <button onClick={()=>handleConfirm(_id)} className="btn btn-ghost btn-xs">pending</button>
                }
            </th>
        </tr>

    );
};

export default BookingRow;