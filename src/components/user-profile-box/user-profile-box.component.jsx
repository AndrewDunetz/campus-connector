import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import MessagingComponent from '../../pages/messaging/messaging.component';

import './user-profile-box.styles.scss';

const UserProfileBox = ({ displayName, email }) => (
  <div className="user-profile-box" >
      <span className='username'>{displayName}</span>
      {/* <div className='btn-small btn--blue message-btn'>Message</div> */}
      <Link className='btn-small btn--blue message-btn' to='/messages'>
        Message
      </Link>
  </div>
);

export default withRouter(UserProfileBox);