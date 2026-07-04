import React, { useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../../utils/feedSlice'
import UserCard from '../UI/UserCard'


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  console.log(feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;

    try{
      const res = await axios.get(BASE_URL + "/feed", {withCredentials: true});
    dispatch(addFeed(res.data.data));
    }catch (err){
      console.error(err || "Something went wrong!!");
    }
    
  };

  useEffect(() => {
    getFeed();
  }, []);

//   return (
//   feed && feed.length > 0 ? (
//     <div className='flex justify-center my-10'>
//       <UserCard user={feed[0]} />
//     </div>
//     ) : (
//       <p className="text-center mt-10">No feed available</p>
//   )
// );

// Example implementation inside Feed.jsx or UserCard.jsx

return (
  <div className="min-h-screen bg-base-200 py-8 px-4">

    {/* Heading */}

    <div className="text-center mb-8">

      <h1 className="text-5xl font-extrabold bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
        👾 Discover Developers
      </h1>

      <p className="text-base-content/70 mt-3 text-lg">
        Swipe through talented developers and grow your network.
      </p>

    </div>

    {feed && feed.length > 0 ? (

      <div className="flex justify-center items-center">

        <UserCard user={feed[0]} />

      </div>

    ) : (

      <div className="flex justify-center items-center mt-24">

        <div className="card bg-base-100 shadow-xl border border-base-300 w-[420px]">

          <div className="card-body text-center">

            <div className="text-7xl">
              🎉
            </div>

            <h2 className="text-3xl font-bold mt-4">
              You're All Caught Up!
            </h2>

            <p className="text-base-content/70 mt-3">
              There are no more developer profiles available right now.
            </p>

            <p className="text-base-content/60">
              Check back later for new connections.
            </p>

          </div>

        </div>

      </div>

    )}

  </div>
);

}

export default Feed;