'use client'

import { useParams } from 'next/navigation';

export default function PostPage() {
    const params = useParams();
    const {id} = params;
    if (!id) {
        return <p className='p-3'>Loading...</p>
    }
    return (
        <p>{id}</p>
    )
}