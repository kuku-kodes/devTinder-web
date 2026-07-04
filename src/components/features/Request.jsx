import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants';
import { addRequest, removeRequest } from '../../utils/requestSlice';
import { useDispatch, useSelector } from 'react-redux';

const Request = () => {


const dispatch = useDispatch();
const requests = useSelector((store) => store.requests);

const reviewRequest = async (status, _id) => {
    try{
        const req = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {withCredentials : true});
        dispatch(removeRequest(_id));
        console.log(req);
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

if(!requests) return null;

if (requests.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl">👾</h1>

        <h2 className="text-3xl font-bold mt-4">
          No Pending Requests
        </h2>

        <p className="text-base-content/70 mt-2">
          You're all caught up! New connection requests will appear here.
        </p>

      </div>

    </div>
  );
}

// if(requests.length === 0) return <h1 className='flex justify-center font-bold my-10 '>No Request Found</h1>;

//   return (
//     <div className='my-10 '>
//     <div className='flex justify-center text-3xl text-white'>Requests</div>
//      {requests?.map((request) => {

//      const {_id, firstName, lastName, photoUrl, age, gender, skills} = request.fromUserId;    

//      return (
//         <div key={_id} className='flex m-4 p-4 gap-5 rounded-lg bg-violet-800 w-1/2 mx-auto items-center justify-center ' >
//             <div>
//                 <img
//                 alt="photo"
//                 className='w-30 h-30 rounded-full object-cover '
//                 src={photoUrl}
//                 ></img>
//             </div>
//             <div className='text-left mx-4 w-xs'>
//                 <h1 className='font-bold text-xl'>{firstName + " " + lastName}</h1>
//                 {age && gender && <h2>{age + ", " + gender}</h2>}
//                 <p>{skills}</p>
//             </div>
//             <div className='flex flex-row gap-2'>
//                     <button className=" m-0.5 btn btn-outline btn-accent " onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
//                     <button className="m-0.5 btn btn-outline btn-secondary " onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
//                 </div>
//         </div>
//      )

//     }
// )}
// </div>
//   )

return (
  <div className="min-h-screen bg-base-200 py-10 px-4">

    {/* Heading */}

    <div className="text-center mb-10">

      <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
        👾 Connection Requests
      </h1>

      <p className="text-base-content/70 mt-2">
        Review developers who want to connect with you.
      </p>

    </div>

    <div className="max-w-5xl mx-auto space-y-6">

      {requests.map((request) => {

        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = request.fromUserId;

        return (

          <div
            key={request._id}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-primary hover:-translate-y-1 transition-all duration-300"
          >

            <div className="card-body">

              <div className="flex flex-col lg:flex-row items-center gap-6">

                {/* Avatar */}

                <div className="avatar">

                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                    <img
                      src={photoUrl}
                      alt={firstName}
                    />

                  </div>

                </div>

                {/* Info */}

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <div className="badge badge-secondary mt-2">
                      {age} yrs • {gender}
                    </div>
                  )}

                  {about && (
                    <p className="mt-4 text-base-content/80 leading-relaxed">
                      {about}
                    </p>
                  )}

                  {/* Skills */}

                  <div className="flex flex-wrap gap-2 mt-4">

                    {(Array.isArray(skills)
                      ? skills
                      : skills?.split(",") || []
                    ).map((skill, index) => (

                      <span
                        key={index}
                        className="badge badge-outline badge-primary p-3"
                      >
                        {skill.trim()}
                      </span>

                    ))}

                  </div>

                </div>

                {/* Buttons */}

                <div className="flex flex-col gap-3 w-full lg:w-auto">

                  <button
                    className="btn btn-success"
                    onClick={() =>
                      reviewRequest("accepted", request._id)
                    }
                  >
                    ✅ Accept
                  </button>

                  <button
                    className="btn btn-outline btn-error"
                    onClick={() =>
                      reviewRequest("rejected", request._id)
                    }
                  >
                    ❌ Reject
                  </button>

                </div>

              </div>

            </div>

          </div>

        );
      })}

    </div>

  </div>
);
}

export default Request