const UserCard = ({ user }) => {
    const { firstName,lastName, photoUrl, about, gender, skills, age} = user;
  return (
    <div className="card bg-base-300 w-96 h-170 shadow-sm">
  <figure>
    <img
      src={user.photoUrl} alt="Photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{"Age: " + age + ", " + "Gender: " + gender}</p>
    <p>{about}</p>
     <p>{"Skills: " + skills}</p>
    <div className="card-actions justify-between m-2">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>
  </div>
</div>
  )
}

export default UserCard;