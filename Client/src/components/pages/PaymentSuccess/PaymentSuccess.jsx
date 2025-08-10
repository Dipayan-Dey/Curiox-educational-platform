import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react' // Optional: using Lucide icons for a success check

function PaymentSuccess({ user }) {
  const params = useParams()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 px-4">
      {user && (
        <div className="bg-white p-8 md:p-12 rounded-xl shadow-md text-center max-w-md w-full">
          <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful</h1>
          <p className="text-gray-600 mb-1">Your course has been activated.</p>
          <p className="text-sm text-gray-500 mb-6">Reference ID: <span className="font-mono">{params.id}</span></p>

          <Link
            to={`/${user._id}/dashboard`}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  )
}

export default PaymentSuccess
