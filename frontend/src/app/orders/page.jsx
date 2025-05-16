
"use client"
import { useEffect, useState } from 'react'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [propertyId, setPropertyId] = useState(0)
  const [customerId, setCustomerId] = useState(0)
  const [error, setError] = useState('')

  const fetchOrders = async () => {
    setError('')
    try {
      const res = await fetch('http://localhost:8080/orders')
      if (!res.ok) throw new Error('Failed to fetch orders')
      const data = await res.json()
      setOrders(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const createOrder = async () => {
    if (!propertyId || !customerId) {
      setError('Property ID and Customer ID are required')
      return
    }

    setError('')
    try {
      const res = await fetch('http://localhost:8080/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, customerId }),
      })
      if (!res.ok) throw new Error('Failed to create order')
      setPropertyId(0)
      setCustomerId(0)
      await fetchOrders()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Inputs */}
      <div className="mb-4 space-y-2">
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="Property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(Number(e.target.value))}
        />
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(Number(e.target.value))}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={createOrder}
        >
          Add Order
        </button>
      </div>
      {/* Orders List */}
      <ul className="space-y-2">
        {orders.map((o) => (
          <li key={o.id} className="border px-4 py-2 rounded">
            <p className="font-medium">Order #{o.id}</p>
            <p className="text-sm text-gray-600">Property ID: {o.propertyId}, Customer ID: {o.customerId}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
