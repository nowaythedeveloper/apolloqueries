import React from 'react'
import { useState } from 'react';
import { gql, useQuery, useLazyQuery } from '@apollo/client';
import '../App.css';

const GET_ALL_DOGS = gql`
  query GetAllDogs {
    getAllDogs {
      name
      age
    }
  }
`

const GET_DOG_BY_NAME = gql`
  query GetDogByName($name: String) {
    getDog(name: $name) {
      name
      age
    }
  }
`

export default function Queries() {
    const [dogInput, setDogInput] = useState("");

    // const [getDog, { loading, error, data }] = useLazyQuery(GET_ALL_DOGS, {
    //   onCompleted: (queryData) => {
    //     console.log(queryData);
    //   }
    // });
  
    // if (loading) return(
    //   <div className="App">
    //     <header className="App-header">
    //       <h1>Loading...</h1>
    //     </header>
    //   </div>
    // )
    // if (error) return `Error: ${error}`;
  
    const [getDogByName, { loading, error, data }] = useLazyQuery(GET_DOG_BY_NAME, {
      onCompleted: (queryData) => {
        console.log(queryData)
      },
      onError: (error) => {
        console.log(error.message)
      }
    })
  
    const message = error?.message || `Find ${data?.getDog?.name}` || 'Dog API'
  
    return (
      <>
        <h1>{message}</h1>
        <input type="text" onChange={(e) => setDogInput(e.target.value)}></input>
        <button onClick={() => getDogByName({ variables: { name: dogInput }})}>Click me!</button>
      </>
    );
}
