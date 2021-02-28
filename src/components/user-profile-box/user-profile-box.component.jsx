import React from 'react';
import { withRouter } from 'react-router-dom';

const UserProfileBox = ({ userName }) => (
  <div className="user-profile-box" >
      <div className='username'>{userName}</div>
      <div className='btn btn--blue'>Message</div>
  </div>
);

export default withRouter(UserProfileBox);