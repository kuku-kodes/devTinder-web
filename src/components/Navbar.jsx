import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {

    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
       try{
         await axios.post( BASE_URL + "/logout", {}, 
          { withCredentials : true});
          dispatch(removeUser());
          return navigate("/login");
       }catch(err){
        console.error(err);
       };
    }
    

  return (
     <div className="navbar bg-violet-500 shadow-lg text-shadow-lg/30 ">
  <div className="flex-1 hover:opacity-70">
    <Link to="/" className="text-2xl">👩🏻‍💻 Devtinder</Link>
  </div>
  {user && (
  <div className="flex gap-2">
    <div className='form-control flex items-center text-xl'>Welcome, {user?.firstName}</div>
    <div className="dropdown dropdown-end mx-5">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user?.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-lg dropdown-content bg-amber-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connection">Connections</Link></li>
         <li><Link to="/requests">Connection Requests</Link></li>
        <li><Link onClick={handleLogout}>Logout</Link></li>
      </ul>
    </div>
  </div>
 )}
</div>
  )
}

export default Navbar