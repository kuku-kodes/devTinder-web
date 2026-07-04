// import axios from "axios";
// import { BASE_URL } from "../../utils/constants";
// import { useDispatch } from "react-redux";
// import { removeUserFromFeed } from "../../utils/feedSlice";

// const UserCard = ({ user }) => {
//   const dispatch = useDispatch();
//   if (!user) {
//     return (
//     <div className="flex flex-col gap-4 w-52 items-center justify-center h-screen mx-auto">
//       <div className="skeleton h-32 w-full"></div>
//       <div className="skeleton h-4 w-28"></div>
//       <div className="skeleton h-4 w-full"></div>
//       <div className="skeleton h-4 w-full"></div>
//     </div>
//     );
//   }

//   const { _id, firstName, lastName, photoUrl, about, gender, skills, age } = user;

//   const handleSendRequest = async (status, userId) => {

//     try{const res = await axios.post(
//          BASE_URL + "/request/send/" + status + "/" + userId, 
//          {},
//          {withCredentials: true}
//         );
//          dispatch(removeUserFromFeed(userId));
//         }catch(err){
//           console.log(err);
//         };
       
//   }

//   return (
//     <div className="card bg-violet-800 w-96 h-200 shadow-lg">
//       <figure>
//         <img src={photoUrl} alt={`${firstName} ${lastName}`} />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">
//           {firstName} {lastName}
//         </h2>
//         <p>Age: {age}, Gender: {gender}</p>
//         <p>{about}</p>
//         <p>Skills: {skills}</p>
//         <div className="card-actions justify-between m-4">
//           <button className="btn btn-primary" 
//           onClick={() => handleSendRequest("ignored", _id)}
//           >Ignore</button>
//           <button className="btn btn-secondary"
//           onClick={() => handleSendRequest("interested", _id)}
//           >Interested</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;

import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="card w-96 bg-base-300 shadow-xl">
          <div className="skeleton h-80 w-full rounded-t-xl"></div>

          <div className="card-body space-y-3">
            <div className="skeleton h-6 w-40"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>

            <div className="flex gap-2">
              <div className="skeleton h-7 w-20 rounded-full"></div>
              <div className="skeleton h-7 w-24 rounded-full"></div>
            </div>

            <div className="flex justify-between mt-5">
              <div className="skeleton h-12 w-32 rounded-xl"></div>
              <div className="skeleton h-12 w-32 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    about,
    gender,
    skills,
    age,
  } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );

      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center py-2">
      <div className="card w-96 bg-base-200 shadow-2xl hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border border-base-300">

        {/* Image */}
        <figure className="h-96 overflow-hidden">
          <img
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover hover:scale-105 duration-500"
          />
        </figure>

        <div className="card-body">

          {/* Name */}
          <h2 className="card-title text-3xl font-bold">
            {firstName} {lastName}
          </h2>

          {/* Age + Gender */}
          <div className="badge badge-secondary badge-lg">
            {age} yrs • {gender}
          </div>

          {/* About */}
          <p className="text-base-content/80 mt-2 leading-relaxed">
            {about}
          </p>

          {/* Skills */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Skills</h3>

            <div className="flex flex-wrap gap-2">
              {skills?.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-outline badge-primary p-3"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="card-actions justify-between mt-8">

            <button
              onClick={() => handleSendRequest("ignored", _id)}
              className="btn btn-outline btn-error flex-1 mr-2"
            >
              ❌ Ignore
            </button>

            <button
              onClick={() => handleSendRequest("interested", _id)}
              className="btn btn-primary flex-1 ml-2"
            >
              ❤️ Interested
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default UserCard;