import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connection = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const fetchConnections = async () => {
         try{
            const res = await axios.get(BASE_URL + "/user/connections" ,
           {withCredentials : true}
           );
             console.log(res?.data?.data);
             dispatch(addConnection(res?.data.data));
            }catch(err){
           console.log(err);
        }

    }

   

    useEffect(() => {
        fetchConnections();
    }, []);

    if(!connections) return;

    if(connections.length === 0) return <h1 className='flex justify-center font-bold my-10 '>No connectin Found</h1>

  return (
      <div  className='my-10 '>


    <div className='flex justify-center text-3xl text-white'>Connections</div>
   
    {connections?.map((connection) => {

     const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = connection;    

     return (
        <div key={_id} className='flex m-4 p-4 gap-5 rounded-lg bg-violet-800 w-1/2 mx-auto ' >
            <div>
                <img
                alt="photo"
                className='w-30 h-30 rounded-full '
                src={photoUrl}
                ></img>
            </div>
            <div className='text-left mx-4'>
                <h1 className='font-bold text-xl'>{firstName + " " + lastName}</h1>
                {age && gender && <h2>{age + ", " + gender}</h2>}
                <p>{skills}</p>
            </div>
        </div>
     )

    }
)}

</div>
   
   
  )
};

export default Connection ;

