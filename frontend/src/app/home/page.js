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

export default function Home() {
    // const [data, setData] = useState(null);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const res = await fetch("http://localhost:8000"); // Use http for localhost
    //             if (!res.ok) {
    //                 throw new Error(`Error: ${res.statusText}`);
    //             }
    //             const result = await res.json();
    //             setData(result);
    //         } catch (err) {
    //             console.error("Fetch error:", err);
    //             setError(err.message);
    //         }
    //     }
    //     fetchData();
    // }, []);

    // if (!data) {
    //     return <div>Loading...</div>
    // }

    // return (
    //     <main>
    //         <h1>
    //             {error ? (
    //                 <div>Error fetching data: {error}</div>
    //             ) : data ? (
    //                 <div>Status is: {data.status}</div>
    //             ) : (
    //                 <div>Loading...</div>
    //             )}
    //         </h1>
    //     </main>
    // );
    return <p>home page</p>
}
