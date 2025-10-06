import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Request = () => {


const dispatch = useDispatch();
const requests = useSelector((store) => store.request);

const reviewRequest = async (status, _id) => {
    try{
        const req = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials : true});
        dispatch(removeRequest(_id));
    }catch(err){
        console.log(err);
    }
}

const fetchRequest = async () => {
    try{
        const req = await axios.get(BASE_URL + "/user/request/received", {withCredentials : true});
        console.log(req?.data?.data);
        dispatch(addRequest(req?.data?.data));
    }catch(err){
        console.log(err);
    }
}

useEffect(() => {
    fetchRequest();
}, []);

if(!requests) return;

if(requests.length === 0) return <h1 className='flex justify-center font-bold my-10 '>No Request Found</h1>;

  return (
    <div className='my-10 '>
    <div className='flex justify-center text-3xl text-white'>Requests</div>
     {requests?.map((request) => {

     const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = request.fromUserId;    

     return (
        <div key={_id} className='flex m-4 p-4 gap-5 rounded-lg bg-violet-800 w-1/2 mx-auto items-center justify-center ' >
            <div>
                <img
                alt="photo"
                className='w-30 h-30 rounded-full object-cover '
                src={photoUrl}
                ></img>
            </div>
            <div className='text-left mx-4 w-xs'>
                <h1 className='font-bold text-xl'>{firstName + " " + lastName}</h1>
                {age && gender && <h2>{age + ", " + gender}</h2>}
                <p>{skills}</p>
            </div>
            <div className='flex flex-row gap-2'>
                    <button className=" m-0.5 btn btn-outline btn-accent " onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                    <button className="m-0.5 btn btn-outline btn-secondary " onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                </div>
        </div>
     )

    }
)}
</div>
  )
}

export default Request