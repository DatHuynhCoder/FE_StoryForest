import React from 'react'
import { api, apiAuth } from '../../services/api'
import { formatPrice } from '../../utils/FormatPrice.js'

const PaymentOption = () => {
  const packages = [
    { duration: 1, price: 50000, description: 'Available in 1 month', name: "1_month" },
    { duration: 3, price: 135000, description: 'Save 10%', name: "3_month" },
    { duration: 6, price: 240000, description: 'Save 20%', name: "6_month" }
  ]

  const handleSelectOption = (duration, price, name) => {
    apiAuth.post('/api/reader/payment/create-payment-link-with-option', {
      duration: duration,
      amount: price,
      name: name
    }).then(res => {
      window.location.href = res.data.url;
    })
  }

  return (
    <div className="py-10 px-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8">Let's start by choose an option</h2>
      <div className="max-w-5xl mx-auto mb-5">
        <div className="bg-white p-6 shadow-md transition-shadow">
          <div className="font-bold text-lg">What you get as a VIP (aka the cool kids club):</div>
          <div>🕵️ Be the first to read our latest chapter drops — hot and fresh, straight to your eyeballs.</div>
          <div>🔍 Use our insanely ultimate powerful blazing-fast slashy search (You type nonsense craps, we dig up gold.)</div>
          <div>🎨 Customize your own theme or pick from a bunch of sexy presets — your vibe, your rules.</div>
          <div>📖 Let us read chapters for you while you lie down like the majestic lazy legend you are (coming soon, we pinky swear).</div>
          <div>🗣️ Voice cloning: Make your voice clone read stuff for you — it’s like audiobook, but with your own glorious voice (yup, also coming soon).</div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto h-screen">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white p-6 shadow-md hover:shadow-xl transition-shadow h-full">
            <h3 className="text-xl font-semibold mb-2 text-center">{pkg.duration} month</h3>
            <p className="text-center text-gray-600 mb-4">{pkg.description}</p>
            <div className="text-center text-2xl font-bold text-indigo-600 mb-4">đ{formatPrice(pkg.price)}</div>
            <button className="block mx-auto px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors"
              onClick={() => {
                handleSelectOption(pkg.duration, pkg.price, pkg.name)
              }}
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentOption
