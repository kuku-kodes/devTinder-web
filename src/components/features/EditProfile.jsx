// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import UserCard from '../UI/UserCard';
// import { BASE_URL } from '../../utils/constants';
// import axios from 'axios';
// import { addUser } from '../../utils/userSlice';



// const EditProfile = ({user}) => {

//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [age, setAge] = useState(user.age || "");
//   const [gender, setGender] = useState(user.gender || "");
//   const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
//   const [about, setAbout] = useState(user.about);
//   const [skills, setSkills] = useState(user.skills);
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const [showToast , setShowToast] = useState(false);

// const saveProfile = async () => {
//   // 🔹 Frontend validation
//   if (!firstName || firstName.trim().length < 4) {
//     setError("First name must be at least 4 characters long");
//     return;
//   }

//   if (!lastName || lastName.trim().length < 4) {
//     setError("Last name must be at least 4 characters long");
//     return;
//   }

//   setError(""); // clear previous error

//   try {
//     const res = await axios.patch(
//       BASE_URL + "/profile/edit",
//       {
//         firstName,
//         lastName,
//         photoUrl,
//         age,
//         gender,
//         about,
//         skills,
//       },
//       { withCredentials: true }
//     );

//     dispatch(addUser(res?.data?.data));
//     setShowToast(true);
//     setTimeout(() => {
//       setShowToast(false);
//     }, 2000);
//   } catch (err) {
//     setError(err?.response?.data?.message || err?.message || "Something went wrong");
//   }
// };


// return (
//     <div className='flex justify-center my-10' >
//      <div className='flex justify-center mx-10 '>
//     <div className="card card-border bg-violet-800 w-96">
//   <div className="card-body">
//     <h2 className="card-title justify-center">Edit Profile</h2>
//     <fieldset className="fieldset">
//   <legend className="fieldset-legend">First Name:</legend>
//   <input 
//   type="text" 
//   value={firstName}
//   className="input w-full" 
//   onChange={(e) => setFirstName(e.target.value)}
//   placeholder="Enter Your First Name" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
//  <fieldset className="fieldset">
//   <legend className="fieldset-legend">Last Name:</legend>
//   <input 
//   type="text" 
//   value={lastName}
//   className="input w-full" 
//   onChange={(e) => setLastName(e.target.value)}
//   placeholder="Enter Your Last Name" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
// <fieldset className="fieldset">
//   <legend className="fieldset-legend">PhotoUrl:</legend>
//   <input 
//   type="text" 
//   value={photoUrl}
//   className="input w-full" 
//   onChange={(e) => setPhotoUrl(e.target.value)}
//   placeholder="Enter Your PhotoUrl" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
//  <fieldset className="fieldset">
//   <legend className="fieldset-legend">Age:</legend>
//   <input 
//   type="text" 
//   value={age}
//   className="input w-full" 
//   onChange={(e) => setAge(e.target.value)}
//   placeholder="Enter Your Age" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
// <fieldset className="fieldset">
//   <legend className="fieldset-legend">Gender:</legend>
//   <select
//     value={gender}
//     onChange={(e) => setGender(e.target.value)}
//     className="select select-bordered w-full"
//   >
//     <option value="" disabled>Choose one…</option>
//     <option value="male">Male</option>
//     <option value="female">Female</option>
//     <option value="others">Others</option>
//   </select>
// </fieldset>

//  {/* <fieldset className="fieldset">
//   <legend className="fieldset-legend">Gender:</legend>
//   <input 
//   type="text" 
//   value={gender}
//   className="input w-full" 
//   onChange={(e) => setGender(e.target.value)}
//   placeholder="Enter Your Gender" />
// </fieldset> */}
//  <fieldset className="fieldset">
//   <legend className="fieldset-legend">About:</legend>
//   <textarea 
//   type="text" 
//   value={about}
//   className="input w-full" 
//   onChange={(e) => setAbout(e.target.value)}
//   placeholder="Enter About Yourself" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
//  <fieldset className="fieldset">
//   <legend className="fieldset-legend">Skills:</legend>
//   <input 
//   type="text" 
//   value={skills}
//   className="input w-full" 
//   onChange={(e) => setSkills(e.target.value)}
//   placeholder="Enter Your Skills" />
//   {/* <p className="label">Optional</p> */}
// </fieldset>
//     <p className='text-red-500'>{error}</p>
//     <div className="card-actions justify-center m-2">
//       <button className="btn btn-secondary" onClick={saveProfile}>Save Profile</button>
//     </div>
//   </div>
// </div>

// </div>
// <UserCard user ={{firstName, lastName, photoUrl, age, gender, about, skills}} />
// <div>
//  {showToast && (
//    <div className="toast toast-top toast-center">
//   <div className="alert alert-success">
//     <span>Profile updated successfully.</span>
//   </div>
// </div>
//  )}
// </div>
// </div>
//   )
// }

// export default EditProfile

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import UserCard from "../UI/UserCard";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "../../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");

  const [skills, setSkills] = useState(
    Array.isArray(user.skills)
      ? user.skills.join(", ")
      : user.skills || ""
  );

  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    if (!firstName || firstName.trim().length < 4) {
      setError("First name must be at least 4 characters.");
      return;
    }

    if (!lastName || lastName.trim().length < 4) {
      setError("Last name must be at least 4 characters.");
      return;
    }

    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data?.data));

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Something went wrong."
      );
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-center items-start">

        {/* Edit Form */}

        <div className="w-full lg:w-1/2">
          <div className="card bg-base-100 shadow-2xl border border-base-300">

            <div className="card-body">

              <h2 className="text-3xl font-bold text-center mb-6">
                ✨ Edit Profile
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>

                  <input
                    type="text"
                    className="input input-bordered"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>

                  <input
                    type="text"
                    className="input input-bordered"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>

                  <input
                    type="number"
                    className="input input-bordered"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="22"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>

                  <select
                    className="select select-bordered"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Choose Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

              </div>

              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>

                <input
                  type="text"
                  className="input input-bordered"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://your-image-url.com"
                />
              </div>

              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">About</span>
                </label>

                <textarea
                  rows={4}
                  className="textarea textarea-bordered"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Tell everyone something interesting..."
                />
              </div>

              <div className="form-control mt-3">
                <label className="label">
                  <span className="label-text">
                    Skills (comma separated)
                  </span>
                </label>

                <input
                  type="text"
                  className="input input-bordered"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              {error && (
                <div className="alert alert-error mt-5">
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={saveProfile}
                className="btn btn-primary btn-lg mt-6"
              >
                💾 Save Profile
              </button>

            </div>
          </div>
        </div>

        {/* Live Preview */}

        <div className="w-full lg:w-auto flex justify-center sticky top-8">

          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills: skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean),
            }}
          />

        </div>

      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">

          <div className="alert alert-success shadow-lg">
            <span>🎉 Profile Updated Successfully!</span>
          </div>

        </div>
      )}
    </div>
  );
};

export default EditProfile;