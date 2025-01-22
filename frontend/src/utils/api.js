// export async function fetchGreeting() {
//     const response = await fetch('http://localhost:8080');
//     return response.text();
// }

export async function getServerSideProps() {
    const res = await fetch("http://localhost:8000").then(x => x.json());
    console.log(res);
    return {
        props: {
            status: res.status,
        }
    }
}