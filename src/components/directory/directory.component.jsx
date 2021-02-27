import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './directory.styles.scss';
import '../../sass/main.scss';

const Directory = ({ currentUser }) => (
  <div>
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

export default Directory;
// export default connect(mapStateToProps)(Directory);