'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import apiLogin from '../../api/login'

export default function Login() {
  const router = useRouter()
  useEffect(() => {
    apiLogin('test@user.me', 'password').then(() => {
      router.push('/')
    })
  }, [router])
  return <div className="flex flex-col items-center justify-center p-4">Logging in...</div>
}
