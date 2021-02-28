import React, { useState, useRef } from 'react';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import './messaging.styles.scss';



const auth = firebase.auth();
const firestore = firebase.firestore();
// var target;

function MessagingComponent() {
    
    const [user] = useAuthState(auth);
    // [target] = firestore.collection('users').doc(targetID);
    
    //Creates the root message window, titles it with the target's name,
    //and runs the chat function
    return (
        <div className = "MessagingComponent">
            <header>
                <h1>{"Chat with " /*+ target.displayName*/}</h1>
            </header>

            <section>
                {Chat}
            </section>

        </div>
    )
}

/*
    handles the chat window and the displayed messages
*/
function Chat() {

    const conversationsRef = firestore.collection('/conversations');
    var currentConversation = 'TestConversation';

    // var convoQuery1 = conversationsRef.
    //     where("user1ID", "==", user).where("user2ID, "==", target");
    // var conovQuery2 = conversationsRef.
    //     where("user2ID", "==", user).where("user1ID, "==", target");

    // //Checks for an existing conversation between the two users
    // //Creates a conversation if none is found
    // if (convoQuery1) {
    //     currentConversation = useCollectionData(convoQuery1, {idField: 'id'});
    // }
    // else if (conovQuery2) {
    //     currentConversation = useCollectionData(convoQuery2, {idField: 'id'});
    // }
    // else {
    //     currentConversation = conversationsRef.add({
    //         user1ID: auth.currentUser.uid,
    //         user2ID: target.uid
    //     })
    // }


    const currentMsg = useRef();
    var messageLimit = 25;
    

    const messagesRef = firestore.collection(
        '/conversations/' + currentConversation + '/messages');

    const query = messagesRef.orderBy('createdAt').limitToLast(messageLimit);

    const [messages] = useCollectionData(query, {idField: 'id'});

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


    //Creates the messaging window and puts the chat messages in it
    return (
        <div className='messaging-window'>
            <main>
                {messages && messages.map(
                    msg => <ChatMessage key = {msg.id} message = {msg}/>)}
                
                <div ref = {currentMsg}></div>
            </main> 

            <form onSubmit = {sendMessage}>

                <input value = {msgDraft} 
                    onChange = {(e) => updateMsgDraft(e.target.value)}/>

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

    //Sets the message's class name and attaches its text
    return (
    <div className = {`message ${messageType}`}>

        <p>{text}</p>
    </div>
    )
}


export default MessagingComponent;
