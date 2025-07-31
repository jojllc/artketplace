'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestConnection() {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState('')

  const testConnection = async () => {
    try {
      setStatus('Testing connection...')
      
      // Try to get the current user (this will fail if not logged in, but that's okay)
      const { data, error } = await supabase.auth.getUser()
      
      if (error && error.message.includes('Invalid API key')) {
        setError('❌ Connection failed: Invalid API key. Check your environment variables.')
      } else if (error && error.message.includes('Invalid URL')) {
        setError('❌ Connection failed: Invalid URL. Check your Supabase URL.')
      } else {
        setStatus('✅ Connection successful! Supabase is working.')
      }
    } catch (err) {
      setError('❌ Connection failed: ' + err)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Test Connection
      </button>
      
      <div className="mt-4">
        <p className="font-medium">Status: {status}</p>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  )
} 