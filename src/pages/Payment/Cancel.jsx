import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { xorDecrypt } from '../../utils/XORDecrypt.js';
import { apiAuth } from '../../services/api.js';
import moment from 'moment/moment.js';

const Cancel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // const userid = xorDecrypt(queryParams.get('userid'), "__storyforest__");
  // const name = queryParams.get('name');
  // const duration = queryParams.get('duration');
  // const price = queryParams.get('price');

  const code = queryParams.get('code');
  const id = queryParams.get('id');
  const cancel = queryParams.get('cancel');
  const status = queryParams.get('status');
  const orderCode = queryParams.get('orderCode');
  // const onUpgradeVip = () => {
  //   apiAuth.patch('/api/reader/account/upgrade').then(res => {
  //     if (res.data.success === true) {
  //       //update user role in redux
  //       dispatch(updateUser(res.data.data))
  //       alert('Now, you are a VIP !')
  //     }
  //     else {
  //       alert('Some errors occur :(')
  //     }
  //   })
  // }
  // const onCreateVIPSubscription = () => {
  //   apiAuth.post('/api/vipreader/vipmanagement', {
  //     userid: userid,
  //     name: name,
  //     price: Number(price),
  //     endDate: moment().add(duration, 'months').valueOf(),
  //     duration: Number(duration) * 30
  //   }).then(res => {

  //   })
  // }
  // useEffect(() => {
  //   // onCreateVIPSubscription()
  //   console.log("userid: ", userid)
  //   console.log("code: ", code)
  //   console.log("id: ", id)
  //   console.log("cancel: ", cancel)
  //   console.log("status: ", status)
  //   console.log("orderCode: ", orderCode)

  //   console.log("name: ", name)
  //   console.log("duration: ", Number(duration) * 30)
  //   console.log("price: ", Number(price))

  //   console.log("enddate: ", moment().add(3, 'months').valueOf())
  // }, [])
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
        <div className="text-red-500 text-6xl mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">Your payment has been cancelled. Details are below:</p>

        <div className="text-left space-y-2 text-sm text-gray-700">
          <p><strong>Code:</strong> {code || 'N/A'}</p>
          <p><strong>ID:</strong> {id || 'N/A'}</p>
          <p><strong>Cancel:</strong> {cancel || 'N/A'}</p>
          <p><strong>Status:</strong> {status || 'N/A'}</p>
          <p><strong>Order Code:</strong> {orderCode || 'N/A'}</p>
        </div>

        <button
          className="mt-8 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={() => window.location.href = '/'}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Cancel;