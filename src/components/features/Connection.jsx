import React, { useEffect } from 'react'
import { BASE_URL } from '../../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../../utils/connectionSlice';

const Connection = () => {

    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);

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

    if (connections.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-5xl mb-4">👾</h1>

        <h2 className="text-3xl font-bold">
          No Connections Yet
        </h2>

        <p className="text-base-content/70 mt-2">
          Start connecting with developers to grow your network.
        </p>

      </div>

    </div>
  );
}

    // if(connections.length === 0) return <h1 className='flex justify-center font-bold my-10 '>No connectin Found</h1>

//   return (
//       <div  className='my-10 '>


//     <div className='flex justify-center text-3xl text-white'>Connections</div>
   
//     {connections?.map((connection) => {

//      const {_id, firstName, lastName, photoUrl, age, gender, about, skills} = connection;    

//      return (
//         <div key={_id} className='flex m-4 p-4 gap-5 rounded-lg bg-violet-800 w-1/2 mx-auto ' >
//             <div>
//                 <img
//                 alt="photo"
//                 className='w-30 h-30 rounded-full '
//                 src={photoUrl}
//                 ></img>
//             </div>
//             <div className='text-left mx-4'>
//                 <h1 className='font-bold text-xl'>{firstName + " " + lastName}</h1>
//                 {age && gender && <h2>{age + ", " + gender}</h2>}
//                 <p>{skills}</p>
//             </div>
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
        👾 My Connections
      </h1>

      <p className="text-base-content/70 mt-2">
        Developers you've successfully connected with.
      </p>

    </div>

    <div className="max-w-5xl mx-auto space-y-6">

      {connections.map((connection) => {

        const {
          _id,
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        } = connection;

        return (

          <div
            key={_id}
            className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-primary hover:-translate-y-1 transition-all duration-300"
          >

            <div className="card-body">

              <div className="flex flex-col md:flex-row items-center gap-6">

                {/* Profile Image */}

                <div className="avatar">

                  <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                    <img
                      src={photoUrl}
                      alt={firstName}
                    />

                  </div>

                </div>

                {/* User Info */}

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <div className="badge badge-secondary mt-2">
                      {age} yrs • {gender}
                    </div>
                  )}

                  <p className="mt-4 text-base-content/80 leading-relaxed">
                    {about}
                  </p>

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

              </div>

            </div>

          </div>

        );
      })}

    </div>

  </div>
);
};

export default Connection ;

