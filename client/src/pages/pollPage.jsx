import React from 'react';
import { Redirect } from 'react-router-dom';

import Poll from '../components/Poll';
import ErrorMessage from '../components/errorMessage';

const PollPage = ({ match, getPoll, isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/login" />;
  getPoll(match.params.id);

  return (
    <div  className="poll" >
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default PollPage;
