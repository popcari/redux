import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector, useDispatch } from "react-redux"

import {
  login,
  getUsers,
  selectLoading,
  selectErrorMessage,
  selectUser,
  users,
} from "../store/userSlice"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  // Select data from store
  const isLoading = useSelector(selectLoading)
  const errorMessage = useSelector(selectErrorMessage)
  const user = useSelector(selectUser)
  const userList = useSelector(users)
  const handleLogin = async () => {
    dispatch(login({ email, password }))
  }

  useEffect(() => {
    const retrieveUserList = async () => {
      const result = await dispatch(getUsers())
      console.log(result) // Log sau khi dispatch hoàn thành
    }

    retrieveUserList()
  }, [dispatch])

  // Navigate to dashboard page if login successful
  if (user) {
    return <Redirect to="/dashboard" />
  }

  const listUsers = userList.map(person => (
    <div key={person.id}>
      <p>
        <b>{person.name}: </b>
        known for {person.username}
      </p>{" "}
    </div>
  ))
  return (
    <>
      <h1>Login</h1>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin} disabled={isLoading}>
        Login
      </button>

      <p style={{ fontSize: "0.7rem", marginTop: "70px" }}>
        <b>Test account:</b>
        <br />
        <i>admin@gmail.com</i>
        <br />
        <i>admin</i>
      </p>

      <div>{listUsers}</div>
    </>
  )
}
