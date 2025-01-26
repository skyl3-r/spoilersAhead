'use client';
import { useState } from 'react';

export default function SeedPage() {
    const [response, setResponse] = useState<null | Record<string, any>>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSeedClick = async () => {
        setLoading(true);
        setError(null); // Reset error state
        try {
            const res = await fetch("http://localhost:8000/api/seed", {
                method: "GET", // Change method if needed (e.g., POST)
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setResponse(data);
        } catch (err) {
            // Narrow down the type of `err`
            if (err instanceof Error) {
                setError(err.message); // If it's an instance of Error, use its message
            } else {
                setError("An unknown error occurred."); // Fallback for unknown errors
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='p-5'>
            <button
                onClick={handleSeedClick}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
                disabled={loading}
            >
                {loading ? "Seeding..." : "Seed Data"}
            </button>
            <div className='mt-5'>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                {response && (
                    <pre className='bg-[#f4f4f4] p-3'>
                        {JSON.stringify(response, null, 2)}
                    </pre>
                )}
            </div>
        </main>
    );
}
