import React from 'react'

const PaymentOption = () => {
  const packages = [
    { duration: '1 Tháng', price: '50.000đ', description: 'Truy cập trong 1 tháng' },
    { duration: '3 Tháng', price: '135.000đ', description: 'Tiết kiệm 10%' },
    { duration: '6 Tháng', price: '240.000đ', description: 'Tiết kiệm 20%' }
  ]

  return (
    <div className="py-10 px-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-8">Chọn gói dịch vụ</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-center">{pkg.duration}</h3>
            <p className="text-center text-gray-600 mb-4">{pkg.description}</p>
            <div className="text-center text-2xl font-bold text-indigo-600 mb-4">{pkg.price}</div>
            <button className="block mx-auto px-6 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
              Chọn gói
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PaymentOption
