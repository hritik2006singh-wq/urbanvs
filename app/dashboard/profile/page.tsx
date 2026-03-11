'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/AuthContext'

export default function ProfilePage() {
    const { getToken } = useAuth()
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getToken()
                if (!token) return

                const res = await fetch('/api/user/profile', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })

                if (!res.ok) throw new Error('Failed to fetch')
                const jsonData = await res.json()
                setData(jsonData)
            } catch (error) {
                console.error('Fetch error:', error)
            }
        }

        fetchData()
    }, [getToken])

    return <div><h1>Profile</h1><pre>{JSON.stringify(data, null, 2)}</pre></div>
}
