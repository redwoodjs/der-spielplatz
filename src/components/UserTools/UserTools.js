import React from 'react';
import PropTypes from 'prop-types';
import netlifyIdentity from 'netlify-identity-widget';

class UserTools extends React.Component {
  constructor(props) {
    super(props);
    netlifyIdentity.init({ APIUrl: 'https://spielplatz.netlify.com/.netlify/identity' });
    this.state = { user: netlifyIdentity.currentUser() };
  }

  componentDidMount() {
    netlifyIdentity.on('login', user => this.setState({ user }));
    netlifyIdentity.on('logout', () => this.setState({ user: null }));
  }

  render() {
    const { user } = this.state;
    if (user === null) {
      return (
        <>
          <button onClick={() => netlifyIdentity.open('login')}>Login</button>{' '}
          <button onClick={() => netlifyIdentity.open('signup')}>Sign up</button>
        </>
      );
    }
    return (
      <>
        {user.user_metadata.full_name}{' '}
        <button onClick={() => netlifyIdentity.logout()}>Logout</button>
      </>
    );
  }
}

export default UserTools;
