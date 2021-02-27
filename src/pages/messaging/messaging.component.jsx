import React, { useState, useRef } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import './messaging.styles.scss';



const auth = firebase.auth();
const firestore = firebase.firestore();

function MessagingComponent() {
    
    const [user] = useAuthState(auth);
    
    return (
        <div className = "MessagingComponent">
            <header>
                <h1>{"This is a chat window"}</h1>
            </header>

            <section>
                {user ? <Chat /> : <Chat />}
            </section>

        </div>
    )
}

/*
    handles the chat window and the displayed messages
*/
function Chat() {

    const currentMsg = useRef();
    var messageLimit = 25;
    var currentConversation = 'TestConversation';
    

    const messagesRef = firestore.collection('/conversations/' + currentConversation + '/messages');

    const query = messagesRef.orderBy('createdAt').limit(messageLimit + 3);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const [msgDraft, updateMsgDraft] = useState(''); 


    //Sends the current message draft and clears the typing box
    const sendMessage = async(e) => {
        e.preventDefault();

        const uid = auth.currentUser.uid;

        await messagesRef.add({
            text: msgDraft,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        updateMsgDraft('');

        currentMsg.current.scrollIntoView({behavior: 'smooth'});
    }

    return (
        <div className='messaging-window'>
            <main>
                {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
                
                <div ref = {currentMsg}></div>
            </main> 

            <form onSubmit = {sendMessage}>

                <input value = {msgDraft} onChange={(e) => updateMsgDraft(e.target.value)} />

                <button type = "submit">{"send"}</button>

            </form> 
        </ div>
    )
}

/*
represents an individual message sent in the chat
*/
function ChatMessage(props) {
    const {text, uid} = props.message;

    const messageType = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
    <div className = {`message ${messageType}`}>
        {/* <img src={photoURL} /> */}
        <p>{text}</p>
    </div>
    )
}


export default MessagingComponent;
