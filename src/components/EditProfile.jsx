import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { addUser } from '../utils/userSlice';



const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(user.skills);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast , setShowToast] = useState(false);

const saveProfile = async () => {
  // 🔹 Frontend validation
  if (!firstName || firstName.trim().length < 4) {
    setError("First name must be at least 4 characters long");
    return;
  }

  if (!lastName || lastName.trim().length < 4) {
    setError("Last name must be at least 4 characters long");
    return;
  }

  setError(""); // clear previous error

  try {
    const res = await axios.patch(
      BASE_URL + "/profile/edit",
      {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
        skills,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  } catch (err) {
    setError(err?.response?.data?.message || err?.message || "Something went wrong");
  }
};


return (
    <div className='flex justify-center my-10' >
     <div className='flex justify-center mx-10 '>
    <div className="card card-border bg-violet-800 w-96">
  <div className="card-body">
    <h2 className="card-title justify-center">Edit Profile</h2>
    <fieldset className="fieldset">
  <legend className="fieldset-legend">First Name:</legend>
  <input 
  type="text" 
  value={firstName}
  className="input w-full" 
  onChange={(e) => setFirstName(e.target.value)}
  placeholder="Enter Your First Name" />
  {/* <p className="label">Optional</p> */}
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Last Name:</legend>
  <input 
  type="text" 
  value={lastName}
  className="input w-full" 
  onChange={(e) => setLastName(e.target.value)}
  placeholder="Enter Your Last Name" />
  {/* <p className="label">Optional</p> */}
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">PhotoUrl:</legend>
  <input 
  type="text" 
  value={photoUrl}
  className="input w-full" 
  onChange={(e) => setPhotoUrl(e.target.value)}
  placeholder="Enter Your PhotoUrl" />
  {/* <p className="label">Optional</p> */}
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Age:</legend>
  <input 
  type="text" 
  value={age}
  className="input w-full" 
  onChange={(e) => setAge(e.target.value)}
  placeholder="Enter Your Age" />
  {/* <p className="label">Optional</p> */}
</fieldset>
<fieldset className="fieldset">
  <legend className="fieldset-legend">Gender:</legend>
  <select
    value={gender}
    onChange={(e) => setGender(e.target.value)}
    className="select select-bordered w-full"
  >
    <option value="" disabled>Choose one…</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="others">Others</option>
  </select>
</fieldset>

 {/* <fieldset className="fieldset">
  <legend className="fieldset-legend">Gender:</legend>
  <input 
  type="text" 
  value={gender}
  className="input w-full" 
  onChange={(e) => setGender(e.target.value)}
  placeholder="Enter Your Gender" />
</fieldset> */}
 <fieldset className="fieldset">
  <legend className="fieldset-legend">About:</legend>
  <textarea 
  type="text" 
  value={about}
  className="input w-full" 
  onChange={(e) => setAbout(e.target.value)}
  placeholder="Enter About Yourself" />
  {/* <p className="label">Optional</p> */}
</fieldset>
 <fieldset className="fieldset">
  <legend className="fieldset-legend">Skills:</legend>
  <input 
  type="text" 
  value={skills}
  className="input w-full" 
  onChange={(e) => setSkills(e.target.value)}
  placeholder="Enter Your Skills" />
  {/* <p className="label">Optional</p> */}
</fieldset>
    <p className='text-red-500'>{error}</p>
    <div className="card-actions justify-center m-2">
      <button className="btn btn-secondary" onClick={saveProfile}>Save Profile</button>
    </div>
  </div>
</div>

</div>
<UserCard user ={{firstName, lastName, photoUrl, age, gender, about, skills}} />
<div>
 {showToast && (
   <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
</div>
 )}
</div>
</div>
  )
}

export default EditProfile