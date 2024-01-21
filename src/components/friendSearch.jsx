import React from 'react';

function FriendSearchResult({ user, friends, addFriends, friendClick}) {

    const isFriend = (friends.some(friend => friend.email.toString() === user.email.toString()));

    return (
        <div className='friend-opt' key={user._id}>
            <div className="details">
                <p className='fs-1.5'>{user.name}</p>
                <p>{user.email}</p>
            </div>
            {isFriend ? (
                <button className="message add-btn" onClick={() => {friendClick(user.email, user.name, user._id) }}>message</button>
            ) : (
                <button className="add-btn" onClick={() => { addFriends(user.email) }}>+ Add </button>
            )}
        </div>
    );
}

export default FriendSearchResult;