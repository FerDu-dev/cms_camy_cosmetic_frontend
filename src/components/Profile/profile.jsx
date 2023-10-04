import React from 'react';
import { Card, Button } from 'react-bootstrap';

export const Profile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;  
  }

  return (
    <h1>Hola mundo </h1>
  );
};

export default Profile;

