import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  if (!user) {
    return (
      <div className="card bg-violet-400 w-96 h-200 shadow-sm flex items-center justify-center">
        <p className="p-4 text-gray-500">No user data available</p>
      </div>
    );
  }

  const { _id, firstName, lastName, photoUrl, about, gender, skills, age } = user;

  const handleSendRequest = async (status, userId) => {

    try{const res = await axios.post(
         BASE_URL + "/request/send/" + status + "/" + userId, 
         {},
         {withCredentials: true}
        );
         dispatch(removeUserFromFeed(userId));
        }catch(err){
          console.log(err);
        };
       
  }

  return (
    <div className="card bg-violet-800 w-96 h-200 shadow-lg">
      <figure>
        <img src={photoUrl} alt={`${firstName} ${lastName}`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>Age: {age}, Gender: {gender}</p>
        <p>{about}</p>
        <p>Skills: {skills}</p>
        <div className="card-actions justify-between m-4">
          <button className="btn btn-primary" 
          onClick={() => handleSendRequest("ignored", _id)}
          >Ignore</button>
          <button className="btn btn-secondary"
          onClick={() => handleSendRequest("interested", _id)}
          >Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
