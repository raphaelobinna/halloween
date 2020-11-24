import React from 'react';
import { Redirect } from 'react-router-dom';

import Admin from '../components/Admin';
import ErrorMessage from '../components/errorMessage';

const AdminPage = ({ isAuthenticated }, props) => {
  if (!isAuthenticated) return <Redirect to="/login" />;

  return (
    <div>
      <ErrorMessage />
      <Admin {...props} />
    </div>
  );
};

export default AdminPage;
