import React from 'react'
import { useLocation } from 'react-router'

function Cancel() {
  const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the query string

  // Extract individual query parameters
  const code = queryParams.get('code');
  const id = queryParams.get('id');
  const cancel = queryParams.get('cancel');
  const status = queryParams.get('status');
  const orderCode = queryParams.get('orderCode');
  console.log("check cancel: ", { code, id, cancel, status, orderCode })
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Code: {code}</p>
      <p>ID: {id}</p>
      <p>Cancel: {cancel}</p>
      <p>Status: {status}</p>
      <p>Order Code: {orderCode}</p>
    </div>
  )
}

export default Cancel