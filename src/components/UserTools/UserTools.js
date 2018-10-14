import React from 'react';
import PropTypes from 'prop-types';
import netlifyIdentity from 'netlify-identity-widget';

const UserTools = () => {
  netlifyIdentity.init({ APIUrl: 'https://spielplatz.netlify.com/.netlify/identity' });

  const user = netlifyIdentity.currentUser();
  if (user === null) {
    return (
      <>
        <a onClick={() => netlifyIdentity.open('login')}>Login</a>{' '}
        <a onClick={() => netlifyIdentity.open('signup')}>Sign up</a>
      </>
    );
  }
  return (
    <>
      {user.user_metadata.full_name} <a onClick={() => netlifyIdentity.logout()}>Logout</a>
    </>
  );
};

export default UserTools;
