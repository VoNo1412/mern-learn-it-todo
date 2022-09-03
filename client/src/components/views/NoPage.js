import { Navigate } from "react-router-dom"
import React from 'react'

const NoPage = () => {
  return <Navigate to={'/login'}  />
}

export default NoPage