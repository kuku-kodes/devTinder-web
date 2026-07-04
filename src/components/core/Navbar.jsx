// import axios from 'axios';
// import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom';
// import { BASE_URL } from '../../utils/constants';
// import { removeUser } from '../../utils/userSlice';

// const Navbar = () => {

//     const user = useSelector((store) => store.user);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//        try{
//          await axios.post( BASE_URL + "/logout", {}, 
//           { withCredentials : true});
//           dispatch({type: 'USER_LOGOUT'});
//           dispatch(removeUser());
//           return navigate("/login");
//        }catch(err){
//         console.error(err);
//        };
//     }
    

//   return (
//      <div className="navbar bg-violet-500 shadow-lg text-shadow-lg/30 ">
//   <div className="flex-1 hover:opacity-70">
//     <Link to="/" className="text-2xl">👩🏻‍💻 Devtinder</Link>
//   </div>
//   {user && (
//   <div className="flex gap-2">
//     <div className='form-control flex items-center text-xl'>Welcome, {user?.firstName}</div>
//     <div className="dropdown dropdown-end mx-5">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           <img
//             alt="user photo"
//             src={user?.photoUrl} />
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-lg dropdown-content bg-amber-700 rounded-box z-1 mt-3 w-52 p-2 shadow">
//         <li>
//           <Link to="/profile" className="justify-between">
//             Profile
//             <span className="badge">New</span>
//           </Link>
//         </li>
//         <li><Link to="/connection">Connections</Link></li>
//          <li><Link to="/requests">Connection Requests</Link></li>
//         <li><Link onClick={handleLogout}>Logout</Link></li>
//       </ul>
//     </div>
//   </div>
//  )}
// </div>
//   )
// }

// export default Navbar

import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import { removeUser } from "../../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch({ type: "USER_LOGOUT" });
      dispatch(removeUser());

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-lg border-b border-base-300 shadow-lg px-6">

      {/* Logo */}

      <div className="flex-1">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition duration-300"
        >
          👾 DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-5">

          <p className="hidden md:block text-lg font-medium">
            Welcome,
            <span className="font-bold text-primary ml-2">
              {user.firstName}
            </span>
          </p>

          <div className="dropdown dropdown-end">

            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar hover:scale-110 transition"
            >
              <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                />

              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-md dropdown-content mt-4 p-2 shadow-2xl bg-base-100 rounded-2xl w-60 border border-base-300"
            >
              <li>
                <Link to="/profile">
                  👤 My Profile
                </Link>
              </li>

              <li>
                <Link to="/connection">
                  🤝 Connections
                </Link>
              </li>

              <li>
                <Link to="/requests">
                  📩 Requests
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogout}
                  className="text-error font-semibold"
                >
                  🚪 Logout
                </button>
              </li>
            </ul>

          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;