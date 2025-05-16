"use client"
import { useEffect, useState } from 'react'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')

  const fetchCustomers = async () => {
    setError('')
    try {
      const res = await fetch('http://localhost:8080/customers')
      if (!res.ok) throw new Error('Failed to fetch customers')
      const data = await res.json()
      setCustomers(data)
    } catch (err) {
      setError(err.message)
    }
  }

  const createCustomer = async () => {
    if (!name || !phone) {
      setError('Name and phone are required')
      return
    }

    setError('')
    try {
      const res = await fetch('http://localhost:8080/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone }),
      })
      if (!res.ok) throw new Error('Failed to create customer')
      setName('')
      setPhone('')
      await fetchCustomers()
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteCustomer = async (id) => {
    setError('')
    try {
      const res = await fetch(`http://localhost:8080/customers/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete customer')
      await fetchCustomers()
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchCustomers()
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* Inputs */}
      <div className="mb-4 space-y-2">
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={createCustomer}
        >
          Add Customer
        </button>
      </div>
      {/* Customers List */}
      <ul className="space-y-2">
        {customers.map((c) => (
          <li key={c.id} className="border px-4 py-2 rounded flex justify-between items-center">
            <div>
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-gray-600">{c.phone}</p>
            </div>
            <button className="text-red-500" onClick={() => deleteCustomer(c.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
