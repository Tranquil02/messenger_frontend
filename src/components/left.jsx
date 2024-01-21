import FriendSearchResult from "./friendSearch";
import "../css/left.css"
import React, { useState } from 'react'
import { server } from "../main";
import axios from "axios";
import { BeatLoader, HashLoader } from "react-spinners";
// import Loader from 'react-loader-spinner'

const Left = ({ friends, friendClick, isSearchVisible, addFriends, toggleSearchVisibility, capitalize,isfriendClick}) => {

  
  const [search, setSearch] = useState("");
  const [friendData, setfriendData] = useState([]);
  const [loading, setLoading] = useState(false)

  const searchFriend = async () => {
    if (search == "") return "";
    // console.log(search)
    setLoading(true)
    axios.get(`${server}/friend/search/${search}`, {
      withCredentials: true
    }).then((res) => {
      setfriendData(res.data.Users)
      setLoading(false)
    }).catch((e) => {
      setLoading(false)
      setfriendData("")
    })
  }


  return (
    <div className={`left ${isfriendClick? 'block' : 'show'}`}>
      {/* {console.log(isfriendClick)} */}
      <h1 className='title'>Friends</h1>

      {(friends.length === 0) ? <p className='no'>No Friends to Show</p> : ""}
      {
        friends?.map((i) => {
          return (
            <div className='friend-list' key={i._id}>
              <div className='friend' onClick={() => { friendClick(i.email, i.name, i._id)}}>
                <h3 className='name'>{capitalize(i.name)}</h3>
                <p className='email' id="friendEmail">{i.email}</p>
              </div>
              <div className="options">

              </div>
            </div>
          )
        })
      }

      <div className="search-container">
        <button className="add" onClick={(e) => { e.stopPropagation(); toggleSearchVisibility() }}>Add Friend</button>
        {isSearchVisible && (
          <div className="search-bar" onClick={(e) => e.stopPropagation()}>
            <input type="text" placeholder="Search your Friend" value={search} onChange={(e) => { setSearch(e.target.value), searchFriend() }} />
            <button onClick={() => { searchFriend() }}>Go</button>
            {/* {console.log(search,friendData)} */}
            {(!search) ? "" : friendData ? (
              <>{
                loading ? (
                  <BeatLoader color="#36d7b7" />
                ) : (
                  friendData.map((user) => (
                    <FriendSearchResult key={user._id} user={user} friends={friends} addFriends={addFriends} friendClick={friendClick} />
                  ))
                )}
              </>
            ) : (
              <p>No user found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Left


