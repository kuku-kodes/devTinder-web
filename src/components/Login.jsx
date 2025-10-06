
import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogginForm, setIsLogginForm] = useState(true);
  const [error, setError] = useState("");
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
    dispatch(addUser(res.data.data));
    return navigate("/");
    } catch(err){
      setError(err?.response?.data || "Something went wrong");
    };
  }

  const handleSignUp = async () => {
    try {
    const res = await axios.post( 
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          emailId,
          password,
    },
    { withCredentials: true});
    dispatch(addUser(res.data.data));
    return navigate("/profile");
    } catch(err){
      setError(err?.response?.data || "Something went wrong");
    };
  }

  return (
    <div className='flex justify-center mt-4'>
    <div className="card card-border bg-violet-800 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">{isLogginForm ? "Login" : "SignUp"}</h2>
    { !isLogginForm && <><fieldset className="fieldset">
  <legend className="fieldset-legend">First Name</legend>
  <input 
  type="text" 
  value={firstName}
  className="input w-full" 
  onChange={(e) => setFirstName(e.target.value)}
  placeholder="Enter your email" />
  {/* <p className="label">Optional</p> */}
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name</legend>
  <input 
  type="text" 
  value={lastName}
  className="input w-full" 
  onChange={(e) => setLastName(e.target.value)}
  placeholder="Enter your email" />
  {/* <p className="label">Optional</p> */}
</fieldset></>}
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
  <legend className="fieldset-legend">Password:</legend>
  <input 
  type="password" 
  value={password}
  className="input w-full" 
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Enter your password" />
  {/* <p className="label">Optional</p> */}
</fieldset>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-secondary" onClick={isLogginForm? handleLogin : handleSignUp}>{isLogginForm ? "Login" : "SignIn"}</button>
    </div>
    <p className=' m-auto underline cursor-pointer' onClick={() => setIsLogginForm((value) => !value)}>{isLogginForm ? "New User? SignIn Here" : "Existing User? Loggin Here"}</p>
  </div>
</div>

</div>
  )
}

export default Login