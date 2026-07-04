
import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constants';

const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

//   return (
//     <div className='flex justify-center mt-10'>
//     <div className="card card-border bg-violet-800 w-96">
//   <div className="card-body">
//     <h2 className="card-title justify-center">{isLogginForm ? "Login" : "SignIn"}</h2>
//     { !isLogginForm && <><fieldset className="fieldset">
//   <legend className="fieldset-legend">First Name</legend>
//   <input 
//   type="text" 
//   value={firstName}
//   className="input w-full" 
//   onChange={(e) => setFirstName(e.target.value)}
//   placeholder="Enter your email" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
//  <fieldset className="fieldset">
//   <legend className="fieldset-legend">Last Name</legend>
//   <input 
//   type="text" 
//   value={lastName}
//   className="input w-full" 
//   onChange={(e) => setLastName(e.target.value)}
//   placeholder="Enter your email" />
//   {/* <p className="label">Optional</p> */}
// </fieldset></>}
//     <fieldset className="fieldset">
//   <legend className="fieldset-legend">Email ID:</legend>
//   <input 
//   type="text" 
//   value={emailId}
//   className="input w-full" 
//   onChange={(e) => setEmailId(e.target.value)}
//   placeholder="Enter your email" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>

// <fieldset className="fieldset">
//   <legend className="fieldset-legend">Password:</legend>
//   <div className="relative w-full">
//     {/* Added relative and z-0 to keep the input at the base level */}
//     <input 
//       type={showPassword ? "text" : "password"} 
//       value={password}
//       className="input w-full pr-16 relative z-0" 
//       onChange={(e) => setPassword(e.target.value)}
//       placeholder="Enter your password" 
//     />
    
//     {/* Increased z-index to z-50 to ensure it stays above the focused input */}
//     <button
//       type="button"
//       className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wider opacity-70 hover:opacity-100 z-50 cursor-pointer"
//       onClick={() => setShowPassword(!showPassword)}
//       onMouseDown={(e) => e.preventDefault()} // Prevents the input from losing focus when you click the button
//     >
//       {showPassword ? "Hide" : "Show"}
//     </button>
//   </div>
// </fieldset>
//  {/* <fieldset className="fieldset">
//   <legend className="fieldset-legend">Password:</legend>
//   <input 
//   type="password" 
//   value={password}
//   className="input w-full" 
//   onChange={(e) => setPassword(e.target.value)}
//   placeholder="Enter your password" />
//   <p className="label">Optional</p> */}
//     <p className='text-red-500'>{error}</p>
//     <div className="card-actions justify-center m-2">
//       <button className="btn btn-secondary" onClick={isLogginForm? handleLogin : handleSignUp}>{isLogginForm ? "Login" : "SignIn"}</button>
//     </div>
//     <p className=' m-auto underline cursor-pointer' onClick={() => setIsLogginForm((value) => !value)}>{isLogginForm ? "New User? SignIn Here" : "Existing User? Loggin Here"}</p>
//   </div>
// </div>

// </div>
//   )

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200 via-base-300 to-base-200 px-4 py-10">

    <div className="card w-full max-w-md bg-base-100 shadow-2xl border border-base-300">

      <div className="card-body">

        {/* Logo */}

        <div className="text-center mb-6">

          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
            👾 DevTinder
          </h1>

          <p className="text-base-content/70 mt-2">
            {isLogginForm
              ? "Welcome back! Login to continue."
              : "Create your developer profile."}
          </p>

        </div>

        {/* First Name */}

        {!isLogginForm && (
          <>
            <div className="form-control">

              <label className="label">
                <span className="label-text font-semibold">
                  First Name
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />

            </div>

            <div className="form-control mt-3">

              <label className="label">
                <span className="label-text font-semibold">
                  Last Name
                </span>
              </label>

              <input
                type="text"
                className="input input-bordered"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />

            </div>
          </>
        )}

        {/* Email */}

        <div className="form-control mt-3">

          <label className="label">
            <span className="label-text font-semibold">
              Email Address
            </span>
          </label>

          <input
            type="email"
            className="input input-bordered"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder="john@example.com"
          />

        </div>

        {/* Password */}

        <div className="form-control mt-3">

          <label className="label">
            <span className="label-text font-semibold">
              Password
            </span>
          </label>

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-primary text-sm font-semibold hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>

          </div>

        </div>

        {/* Error */}

        {error && (
          <div className="alert alert-error mt-5">

            <span>{error}</span>

          </div>
        )}

        {/* Button */}

        <button
          className="btn btn-primary btn-lg mt-6"
          onClick={isLogginForm ? handleLogin : handleSignUp}
        >
          {isLogginForm ? "🚀 Login" : "✨ Create Account"}
        </button>

        {/* Divider */}

        <div className="divider">OR</div>

        {/* Toggle */}

        <p
          onClick={() => {
            setIsLogginForm(!isLogginForm);
            setError("");
          }}
          className="text-center cursor-pointer text-primary font-semibold hover:underline transition"
        >
          {isLogginForm
            ? "New here? Create an Account"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>

  </div>
);
}

export default Login