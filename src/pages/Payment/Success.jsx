import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { apiAuth } from '../../services/api';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/userSlice';

function Success() {
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the query string
  // http://localhost:5173/payment/success?userid=680b0317446eb05ee1287838&code=00&id=8d3dd43cdfed45ad991b7fc00f12c523&cancel=false&status=PAID&orderCode=174646546908525
  const userid = queryParams.get('userid');
  const code = queryParams.get('code');
  const id = queryParams.get('id');
  const cancel = queryParams.get('cancel'); // false
  const status = queryParams.get('status'); // PAID
  const orderCode = queryParams.get('orderCode');
  useEffect(() => {
    apiAuth.patch('/api/reader/account/upgrade').then(res => {
      if (res.data.success === true) {
        //update user role in redux
        dispatch(updateUser(res.data.data))
        alert('Now, you are a VIP !')
      }
      else {
        alert('Some errors occur :(')
      }
    })
  }, [])
  return (
    <>
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1 style={{ color: '#4CAF50' }}>Payment Successful!</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>
          Thank you for your payment. Your transaction has been completed successfully.
        </p>
        <p style={{ fontSize: '16px', color: '#777' }}>
          Order Code: <strong>{orderCode}</strong>
        </p>
        <button
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => window.location.href = '/'}
        >
          Go to Homepage
        </button>
      </div>
    </>
  )
}

export default Success