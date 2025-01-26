// 'use client'
// import { useEffect, useState } from 'react';
// import { getServerSideProps } from "@/utils/api";
// // import { fetchGreeting } from '../../utils/api';

// export default function Home() {
//     const [data, setData] = useState(null);
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const res = await fetch("http://localhost:8000");
//                 if (!res.ok) {
//                     throw new Error(`Error: ${res.statusText}`);
//                 }
//                 const result = await res.json();
//                 console.log(result);
//                 setData(result);
//             } catch (err) {
//                 console.error("Fetch error:", err);
//             }
//         }
//         fetchData();
//     }, []);
//     return (
//         <main>
//             <h1>
//                 <div>Status is: </div>
//             </h1>
//         </main>
//     )
//     // const [greeting, setGreeting] = useState('');

//     // useEffect(() => {
//     //     fetchGreeting().then(setGreeting);
//     // }, []);

//     // return <h1>{greeting}</h1>;
// }

'use client';
import { useEffect, useState } from 'react';
import PopularBanner from "@/components/PopularBanner"
import Posts from "@/components/Posts"

export default function Home() {
    return (
        <div>
            <PopularBanner />
            <Posts />
        </div>
    )
}
