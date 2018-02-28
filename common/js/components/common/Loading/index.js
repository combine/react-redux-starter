import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  const { error, timedOut, pastDelay } = props;

  if (error) {
    // When the loader has errored
    return (
      <div>Error!</div>
    );
  } else if (timedOut) {
    // When the loader has taken longer than the timeout
    return (
      <div>Taking a long time...</div>
    );
  } else if (pastDelay) {
    // When the loader has taken longer than the delay
    return (
      <div>Loading...</div>
    );
  }

  return null;
};

Loading.propTypes = {
  error: PropTypes.bool,
  timedOut: PropTypes.bool,
  pastDelay: PropTypes.bool
};

export default Loading;
