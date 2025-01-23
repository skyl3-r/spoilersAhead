'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import MyLogo from './Logo';
import { noticia } from '@/utils/fonts';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    username: string;
    exp: number;
}
export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                if (decoded.exp > currentTime) {
                    setLoggedIn(true);
                    setUsername(decoded.username);
                }
            } catch (err) {
                console.error('Invalid or expired token', err);
            }
        }
    }, []);

    const handleLogin = () => {
        if (isLoggedIn) {
            localStorage.removeItem('token');
            window.location.reload();
        } else {
            window.location.href = '/login';
        }
    }

    return (
        <header className='shadow-md flex flex-row justify-between p-5'>
            <nav>
                <Link href="/home">
                    <MyLogo />
                </Link>
            </nav>
            <div className='flex flex-row items-center'>
                <p className={`${noticia.className} text-xl text-black`}>{isLoggedIn ? `${username} |\xa0` : ''}</p>
                <button 
                    onClick={handleLogin}
                    className={`${noticia.className} text-xl text-black hover:text-neutral-400`}>
                    {isLoggedIn ? `Logout` : 'Login'}
                </button>
            </div>
            
        </header>
    )
}