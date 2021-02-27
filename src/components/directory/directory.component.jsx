import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { Typeahead } from "react-bootstrap-typeahead";

// import 'firebase/auth';
// import {useAuthState} from 'react-firebase-hooks/auth';

// const db = firestore();

import './directory.styles.scss';
import '../../sass/main.scss';

// const auth = firebase.auth();
// const [user] = useAuthState(auth);

const Directory = ({ currentUser }) => (
  console.log(currentUser.id), 
  <div>
    {/* <Typeahead
      placeholder="Search for Friends"
      onChange={searchChange}
      options={interests.data || []}
      labelKey="name"
      clearButton={true}
      inputProps={{
        className: "company-search-input"
      }}
      ref={el => (typeahead = el)}
    /> */}
    {currentUser ? (
      <div className='btn btn--blue' onClick={() => auth.signOut()}>
        SIGN OUT
      </div>
    ) : (
      null
    )}
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

//export default Directory;
export default connect(mapStateToProps)(Directory);
