import React from 'react';
import '/src/App.css'; //Using main app css, can be replaced

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';


firebase.initializeApp({
    apiKey: "AIzaSyBsu06wCyqc19HzVmuuHqMiepaCDhK-8OY",
    authDomain: "campus-connector.firebaseapp.com",
    projectId: "campus-connector",
    storageBucket: "campus-connector.appspot.com",
    messagingSenderId: "909438247237",
    appId: "1:909438247237:web:6e88a9f6fd07f3c1779e2c"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

/* 
decides what appears in the message window based on whether or not the user is 
logged in. Probably unnecessary because the authentication is handled through 
the main app, meaning the message window will only be opened if the user is 
logged in.


function MessageInterface() {

    const [user] = useAuthState(auth);

    return (
        <div className = "MessageInterface">
            <header className = "MessageInterface-header">

            </header>

            
        </div> 
    );
}*/

/*
    handles the chat window and the displayed messages
*/
function Chat() {

    var messageLimit = 25;

    const messagesRef = firestore.collection('messages');
    const messageLog = 
        messagesRef.orderBy('createdAt').endAtlimit(messageLimit);
    const [messages] = useCollectionData(messageLog, {idField: 'id'});

    const [messageDraft, updateDraft] = useState(''); /*if messageDraft and updateDraft don't work, 
                                                        replace with formValue and setFormValue*/


    const sendMessage = async(e) => {
        e.preventDefault();

        const {uid, photoURL} = auth.currentUser;

        await messagesRef.add({
            text: messageDraft,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        })

        updateDraft('');
    }

    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key = {msg.id} message = {msg}/>)}
            </div> 

            <form onSubmit = {sendMessage}>

                <input value = {messageDraft} onChange={(e) => updateDraft(e.target.value)} />

                <button type = "submit">{"send"}</button>

            </form> 
        </>
    )
}

/*
represents an individual message sent in the chat
*/
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageType = uid === auth.currentUser.uid ? 'sent' : 'received'

    return (
    <div className = {`message ${messageType}`}>
        <img src = {photoURL} />
        <p>{text}</p>
    </div>
    )
}


export default MessageInterface;
