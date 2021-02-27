import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Typeahead } from "react-bootstrap-typeahead";
import { firestore } from '../../firebase/firebase.utils';

// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';

import './directory.styles.scss';
import '../../sass/main.scss';

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
        <div className='btn btn--blue' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
        <ul>
          {items.map(item => (
            <li>
              <span key={items.indexOf(item)}>{item.interests}</span>
            </li>
          ))}
        </ul>
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