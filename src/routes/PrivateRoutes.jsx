import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '../Layout'
import axios from 'axios';

const PrivateRoutes = () => {
  const token = localStorage.getItem('token')
  
  return (
    <>
    {token ? <Outlet/> : <Navigate to={'/'} />}
    </>
  )
}

export default Layout(PrivateRoutes)
