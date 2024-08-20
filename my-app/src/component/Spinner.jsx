import React, { useState, useEffect } from "react"
/* eslint-disable @typescript-eslint/no-restricted-imports */
import { useSelector, useDispatch } from "react-redux"

import { selectLoading } from "../store/userSlice"

export default function Spinner() {
  const isSpinnerShow = useSelector(selectLoading)
  // if (!isSpinnerShow) return

  return (
    <>
      {isSpinnerShow ? (
        <div className="spinner-container">
          <span class="loader"></span>
        </div>
      ) : null}
    </>
  )
}
