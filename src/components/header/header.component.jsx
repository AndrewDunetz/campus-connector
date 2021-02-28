import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import { ReactComponent as Logo } from '../../assests/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <header className='header'>
    {/* <div className='header__logo-box'>
      <img src='img/logo-white.png' alt='Logo' className='header__logo' />
    </div> */}

    <div className='header__login'>
      {currentUser ? (
        <div className='btn btn--blue' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='btn btn--blue' to='/signin'>
          SIGN IN
        </Link>
      )}
    </div>

    <div className='header__text-box'>
      <h1 className='heading-primary'>
          <span className='heading-primary--main'>Campus Connector</span>
          <span className='heading-primary--sub'>Find friends on your campus</span>
      </h1>
      
      {/* <a href='#' className='btn btn--blue btn--animated'>Find friends</a> */}
      <Link className='btn btn--blue btn--animated' to='/signin'>
        Find Friends
      </Link>
    </div>
  </header>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Header);