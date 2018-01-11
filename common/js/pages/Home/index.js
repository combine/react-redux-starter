import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import css from './index.scss';

class HomePage extends Component {
  render() {
    return (
      <div className={css.home}>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h1>It Works!</h1>
        <p>
          You've successfully started up your first universally rendered react
          and redux app.<br />
          Hint: Try View Source on this page to see that it was rendered on the
          server as well.
        </p>
        <p>
          Check out the <Link to="/todos">todos list</Link>.
        </p>
      </div>
    );
  }
}

export default HomePage;
