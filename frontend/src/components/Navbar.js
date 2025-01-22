'use client'
import Link from 'next/link';
import { useState } from 'react';
import MyLogo from './Logo';
import { noticia } from '@/utils/fonts';

export default function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const toggleLoggedIn = () => {
        setLoggedIn(!isLoggedIn);
    }

    return (
        <header className='shadow-md flex flex-row justify-between p-5'>
            <nav>
                <Link href="/home">
                    <MyLogo />
                </Link>
            </nav>
            <button 
                onClick={toggleLoggedIn}
                className={`${noticia.className} text-xl text-[#331832] hover:text-neutral-400`}>
                {isLoggedIn ? 'Logout' : 'Login'}
            </button>
        </header>
    )
}