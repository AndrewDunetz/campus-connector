import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Nav, Button, Alert, Badge, Form } from "react-bootstrap";
import {
  faChartPie,
  faSearch,
  faCog,
  faUsersCog,
  faUser,
  faHome,
  faEnvelope,
  faCloudUploadAlt
} from "@fortawesome/free-solid-svg-icons";

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Typeahead } from "react-bootstrap-typeahead";
import { firestore } from '../../firebase/firebase.utils';
import findMatches from '../../findMatches';

// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';

import './directory.styles.scss';
import '../../sass/main.scss';

async function matches() {
  findMatches();
}

function Type() {
  var resultJson;
  var interestArray = [];
  let docRef = firestore.collection("interests");
  let allDocs = docRef.get()
    .then(snapshot => {
        resultJson = snapshot.docs.map(doc => {
          //return { id: doc.id, ...doc.data() }
          interestArray.push(doc.id.toString());
          return doc.id
        });
        // return (
        //   {users.forEach(user => (
        //     {user}
        //   ))}
        // );
        //console.log(JSON.stringify(resultJson));
        //res.json(resultJson);
  })
  .catch(err => {
    console.log('Error getting interests documents', err);
  });

  const { interests } = useState();
  const [interestsSearchVal, setInterestsSearchVal] = useState();
  const [ users, setUsers ] = useState([]);

  const searchChange = val => {
    if (val && val.length) {
      setInterestsSearchVal(val[0]);
      console.log("IN HERE 3");
    } else {
      setInterestsSearchVal("");
    }
  };

  const submitSearch = () => {
    if (interestsSearchVal) {
      // typeahead.getInstance().clear();
      // props.history.push(`/interests/${interestsSearchVal}`);
      console.log("IN HERE");
      const allUsers = firestore.collection("users");
      console.log(interestsSearchVal);
      var matchesArray = [];

      let docRef = firestore.collection("users").where("interests", 'array-contains', interestsSearchVal);
      let allDocs = docRef.get()
        .then(snapshot => {
          resultJson = snapshot.docs.map(doc => {
              //return { id: doc.id, ...doc.data() }
              matchesArray.push(doc.data().displayName);
              // <div>
              //   <span>{doc.data().displayName}</span>
              // </div>
              return doc.data().displayName
          });
          setUsers(resultJson);
        //console.log(JSON.stringify(resultJson));
        //res.json(resultJson);
        console.log(matchesArray);
      })
    .catch(err => {
      console.log('Error getting interests documents', err);
    });
    }
    else {
      console.log("IN HERE 2");
          }
  };

  const addInterest = () => {

  };

  let typeahead;

  console.log(interestArray);
  
  return (
    <Nav className="ml-4 mr-auto">
      <React.Fragment>
        <Typeahead
          id="id"
          placeholder="Search for Friends"
          onChange={searchChange}
          options={interestArray || []}
          labelKey="name"
          clearButton={true}
          inputProps={{
            className: "company-search-input u-margin-right-small"
          }}
          ref={el => (typeahead = el)}
        />
        <Button className='u-margin-right-small' variant="primary" onClick={submitSearch}>
          <FontAwesomeIcon icon={faSearch} size="1x" />
        </Button>
        <Button variant="primary" onClick={addInterest}>
          Add Interest
        </Button>
      </React.Fragment>
      <div>
        <ul>
          {users.map(user => (
            <li>
              <span key={user.indexOf(user)}>{user}</span>
            </li>
          ))}
        </ul>
      </div>
    </ Nav>
  )
}

class Directory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    const items = [];

    firestore
      .collection("users")
      .get()
      .then((querySnapshot) => {  //Notice the arrow funtion which bind `this` automatically.
          querySnapshot.forEach(function(doc) {
              items.push(doc.data());
          });
          this.setState({ items: items });   //set data in state here
        });
  }

  render() {
    const items = this.state.items;
    console.log("items", items);

    return (
      <div>
        <h1 className='heading-secondary'>
            Campus Connector
          </h1>
        <div className='navigation'>
          {/* <div className='btn btn--blue u-margin-right-small'>
            Edit Profile
          </div> */}
          <div className='btn btn--blue u-margin-right-small' onClick={() => matches()}>
            Find Matches
          </div>
          <div className='btn btn--blue' onClick={() => auth.signOut()}>
            Sign out
          </div>
        </div>
        <div className='search-bar'>
          <Type></Type>
        </div>
        {/* <ul>
          {items.map(item => (
            <li>
              <span key={items.indexOf(item)}>{item.interests}</span>
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Directory);

// export default Directory;

// // const auth = firebase.auth();
// // const [user] = useAuthState(auth);

// // const db = firestore;
// // const snapshot = db.collection('interests').get();
// const Directory = ({ currentUser }) => (
//   // console.log(currentUser.id), 
//   // firestore.collection("users").get().then((querySnapshot) => {
//   //   querySnapshot.forEach((doc) => {
//   //       // console.log(`${doc.id} => ${doc.data()}`);
//   //       <h1>{doc.id}</h1>
//   //   });
//   // }),
//   // firestore.collection("users").get().then((querySnapshot) => {
//   //   querySnapshot.docs.map(({ id, ...otherProps}) => {
//   //     <h1>{id}</h1>
//   //   })
//   // }),
//   <div>
//   {currentUser ? (
//     <div className='btn btn--blue' onClick={() => auth.signOut()}>
//       SIGN OUT
//     </div>
//   ) : (
//     null
//   )}
//   </div>
// );

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,
//   hidden: selectCartHidden
// });

// //export default Directory;
// export default connect(mapStateToProps)(Directory);


//     {/* <Typeahead
//       placeholder="Search for Friends"
//       onChange={searchChange}
//       options={interests.data || []}
//       labelKey="name"
//       clearButton={true}
//       inputProps={{
//         className: "company-search-input"
//       }}
//       ref={el => (typeahead = el)}
//     /> */}