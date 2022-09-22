import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function NewUserRedirect() {
  const newUserId = uuidv4();
  const { gameId } = useParams();

  return (
    <Navigate to={`/controller/${gameId}/register/${newUserId}`} />
  );
}
