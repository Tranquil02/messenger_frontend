import React from 'react'
import MessageList from './MessageList'
import "../css/right.css";

const Right = ({ sentMessages, recMessages, frndemail, capitalize, friendName, handleDeleteFriend, setText, text, sendHandler,loading}) => {
    const goBackHandler=()=>{
        window.history.back();
    }
    return (
        <div className={`right ${frndemail ? 'show' : 'block'}`}>
            {frndemail && (
                <div className="chat-header">
                    
                    <button className="back-btn" onClick={goBackHandler}>
                        <svg width="8px" height="8px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
                            <path fill="#000000" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
                        </svg>
                    </button>

                    <h2>{capitalize(friendName)}</h2>

                    <button className="delete-btn" onClick={() => handleDeleteFriend(frndemail)}>Delete</button>
                </div>
            )}
            <MessageList messages={recMessages.concat(sentMessages)} myemail={frndemail} />
            {(frndemail == "") ? "" : (
                <div className="message-input">
                    <input type="text" placeholder="Type a message..." value={text} onChange={(e) => { setText(e.target.value) }} />
                    <button onClick={() => { sendHandler() }} disabled={loading}
                    >send</button>
                </div>
            )}
        </div>
    )
}


export default Right
