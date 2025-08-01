
import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("nakul@gmail.com");
  const [password, setPassword] = useState("Nakul@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
    const res = await axios.post( 
        BASE_URL + "/login",
        {
        emailId,
        password,
    },
    { withCredentials: true});
    dispatch(addUser(res.data));
    return navigate("/");
    } catch(err){
        console.error(err);
    }
  }

  return (
    <div className='flex justify-center mt-4'>
    <div className="card card-border bg-base-300 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Login</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">Email ID:</legend>
  <input 
  type="text" 
  value={emailId}
  className="input w-full" 
  onChange={(e) => setEmailId(e.target.value)}
  placeholder="Enter your email" />
  {/* <p className="label">Optional</p> */}
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input 
  type="text" 
  value={password}
  className="input w-full" 
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password" />
  {/* <p className="label">Optional</p> */}
</fieldset>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>

</div>
  )
}

export default Login