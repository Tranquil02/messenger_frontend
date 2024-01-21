import React, { useState, useEffect, useContext } from 'react'
import "../css/home.css"
import axios from 'axios';
import { Context, server } from '../main';
import toast, { LoaderIcon } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import Left from './left.jsx';
import Right from './Right.jsx';
import "../css/messages.css"
import { BeatLoader } from 'react-spinners';
import Loader from './Loader.jsx';

function Home() {

  const [friends, setfriend] = useState([]);
  const [text, setText] = useState("");
  const [sentMessages, setSentMessages] = useState([]);
  const [recMessages, setRecMessages] = useState([]);
  const [frndemail, setEmail] = useState("");
  const [friendName, setFriendName] = useState("Friend")
  const [refresh, setRefresh] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [loading, setLoading] = useState(true)

  const { isAuthenticated, user } = useContext(Context);

  // const [addFriend, setAddFriend] = useState("");


  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  // *************************Search Friend *******************************************
  document.body.addEventListener('click', () => {
    // console.log("click")
    // Check if the click is outside the search bar
    if (isSearchVisible) {
      setIsSearchVisible(false);
    }
  });

  const toggleSearchVisibility = () => {
    // console.log("click")
    setIsSearchVisible(!isSearchVisible);
  };



  // *****************friend Pr click krne par **************************************
  function friendClick(email, name) {
    setFriendName(name)
    setEmail(email)
    setRefresh(prev => !prev)
  }
  // ********************************* Delete friend handler ***********************
  const handleDeleteFriend = async (email) => {
    setLoading(true)
    try {
      setRefresh(false);
      axios.delete(`${server}/friend/delete/${email}`, {
        withCredentials: true
      }).then((res) => {
        console.log(email)
        toast.success(res.data.message)
        setRefresh(true);
        setLoading(false)
      }).catch((e) => {
        // console.log(e);
        toast.error(e.response.data.errmsg);
        setRefresh(true)
        setLoading(false)
      })
    } catch (error) {
      toast.error("Network Issue")
      setLoading(false)
    }
  }
  // ****************Add friend Handler *********************************

  const addFriends = async (email) => {
    // console.log("click", email)
    const data = await axios.post(`${server}/friend/add`, {
      email
    }, {
      headers: { "Content-Type": "application/json" },
      httpVersion: 'HTTP/1.1',
      withCredentials: true
    })
    setRefresh(prev => !prev)
  }
  // ****************send messages Handler *********************************

  const sendHandler = async (req, res, next) => {
    // setLoading(true)
    if (text === "") return toast.error("cannot send blank message");
    const data = await axios.post(`${server}/messages/send/${frndemail}`, {
      text
    }, {
      headers: { "Content-Type": "application/json" },
      httpVersion: 'HTTP/1.1',
      withCredentials: true
    })
    // setLoading(false)
    setText("");
    setRefresh(prev => !prev)
  }
  // *****************UseEffect for sent Messages*******************

  useEffect(() => {
    setLoading(true)
    try {
      if (!frndemail == "") {
        axios.get(`${server}/messages/sent/${frndemail}`, {
          withCredentials: true
        }).then((res) => {
          setSentMessages(res.data.messages);
          setLoading(false)
        }).catch((e) => {
          // console.log(e);
          toast.error("Network Error")
          setLoading(false)
        })
      }
    } catch (error) {
      toast.error("Network Issue")
      setLoading(false)
    }
  }, [refresh])
  // *****************UseEffect for Receive Messages*******************

  useEffect(() => {
    try {
      if (!frndemail == "") {
        setLoading(true)
        axios.get(`${server}/messages/receive/${frndemail}`, {
          withCredentials: true
        }).then((res) => {
          setRecMessages(res.data.messages);
          setLoading(false)
        }).catch((e) => {
          console.log(e);
        })
      }
    } catch (error) {
      toast.error("Network Issue")
      setLoading(false)
    }

  }, [refresh])

  // *****************UseEffect for my Friends list*******************

  useEffect(() => {
    setLoading(true)
    axios.get(`${server}/friend/all`, {
      withCredentials: true
    }).then((res) => {
      setfriend(res.data.friends)
      setLoading(false)
    }).catch((e) => {
      toast.error("Network Error")
      setLoading(false)
      // console.log(e)
    })
  }, [refresh])

  if (!isAuthenticated) return <Navigate to={"/login"} />
  // if(loading) return console.log("yes")

  return (
    <div className="home">
      <div className="container">

        {loading ? ( // Render loader while loading
          <Loader/>
        ) : (
          <>
            <Left friends={friends} friendClick={friendClick} isSearchVisible={isSearchVisible} addFriends={addFriends} toggleSearchVisibility={toggleSearchVisibility} capitalize={capitalize} loading={loading}/>

            <Right sentMessages={sentMessages} recMessages={recMessages} frndemail={frndemail} capitalize={capitalize} friendName={friendName} handleDeleteFriend={handleDeleteFriend} setText={setText} text={text} sendHandler={sendHandler} />
          </>
        )}
      </div>
    </div >
  )
}

export default Home
