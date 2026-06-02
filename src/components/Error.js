import React from 'react'
import { useRouteError } from 'react-router-dom'
const Error = () => {
    const error = useRouteError();
    console.error(error);
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>{error?.statusText || error?.message}</p>
    </div>
  )
}

export default Error
