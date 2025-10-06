import React, { useEffect } from 'react'
import axios from 'axios'
import {BASE_URL} from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


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

  return (
  feed && feed.length > 0 ? (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
    ) : (
      <p className="text-center mt-10">No feed available</p>
  )
);
}

export default Feed;