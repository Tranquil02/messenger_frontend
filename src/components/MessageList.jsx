import React, { useRef, useEffect } from 'react';

function MessageList({ messages, myemail }) {
    const chatContainerRef = useRef(null);
    const sortedMessages = messages.slice().sort((a, b) => new Date(a.time) - new Date(b.time));

    useEffect(() => {
        // Scroll to the bottom of the chat container when new messages are added
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const renderMessagesWithDate = () => {
        let currentDate = null;
        const today = new Date().toLocaleDateString();
        const yesterday = new Date(Date.now() - 86400000).toLocaleDateString(); // 86400000 milliseconds in a day

        return sortedMessages.map((message, index) => {
            const messageDate = new Date(message.time).toLocaleDateString();

            let formattedDate;
            if (messageDate === today) {
                formattedDate = 'Today';
            } else if (messageDate === yesterday) {
                formattedDate = 'Yesterday';
            } else {
                formattedDate = messageDate;
            }

            const messageTime = new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Check the date is the same as the current date
            const isSameDate = messageDate === currentDate;

            // Update currentDate if the date is different
            if (!isSameDate) {
                currentDate = messageDate;
            }

            // Use a key that includes a prefix for received messages
            const key = message.email === myemail ? message.time : `received_${index}_${message.time}`;

            return (
                <React.Fragment key={key}>
                    {!isSameDate && (
                        <div className="message-date" key={`date_${key}`}>
                            <p>{formattedDate}</p>
                        </div>
                    )}
                    <div className={`message ${message.email === myemail ? 'sent' : 'received'}`} key={key}>
                        <div className="message-content">
                            <p>{message.text}</p>
                            <small>{messageTime}</small>
                        </div>
                    </div>
                </React.Fragment>
            );
        });
    };

    return (
        <div className="chat-messages" ref={chatContainerRef}>
            {renderMessagesWithDate()}
        </div>
    );
}

export default MessageList;
