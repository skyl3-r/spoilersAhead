'use client'

import MyLogo from "@/components/Logo"
import { useState } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import { noticia } from "@/utils/fonts";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            router.push('/home');
        } else {
            alert("Invalid username or password");
        }
    }
    
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="p-6 bg-slate-300 rounded shadow-lg">
        <div className="border-b-2 border-[#331832] pb-2">
            {/* <MyLogo /> */}
        <p className={`${noticia.className} text-lg`}>Login</p>

        </div>
        <form onSubmit={handleLogin} className="space-y-4 mt-4">
        <div>
            <label htmlFor="username" className={`${noticia.className} block mb-1`}>Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="password" className={`${noticia.className} block mb-1`}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <Link href='/signup'>
                <p className={`${noticia.className} underline`}>Sign up instead</p>
            </Link>
          </div>
          <div className="flex flex-row justify-between">
            <button
                type="submit"
                className={`${noticia.className} bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded`}
            >
                Login
            </button>
            <Link href="/">
                <p className="bg-neutral-400 hover:bg-neutral-500 text-white py-2 px-4 rounded">
                  Cancel
                </p>
            </Link>
          </div>
          

        </form>
      </div>
    </div>

  )
}