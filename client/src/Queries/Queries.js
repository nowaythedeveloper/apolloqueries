import React from 'react'
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import '../App.css';

const CREATE_USER = gql`
  mutation CreateUser($input: UserInput ) {
    createUser(input: $input) {
      id
      username
      age
    }
  }
`;

export default function Queries() {

  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const [newUser] = useMutation(CREATE_USER)

  const createUser = () => {
    newUser({
      variables: {
        input: {
          username,
          age
        }
      }
    })
  }
  return(
    <>
      <h1>Users</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          createUser({ variables: { input: { username, age}}})
        }}
      >
        <label htmlFor='username'>Username:</label>
        <input id='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor='age'>Age:</label>
        <input id='age' type='text' value={age} onChange={(e) => setAge(e.target.value)} />
        <button type="submit">Click me!</button>
      </form>
    </>
  )
}
