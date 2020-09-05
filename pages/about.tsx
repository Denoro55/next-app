import {MainLayout} from '../layout/main';
import Head from 'next/dist/next-server/lib/head';
import {useEffect, useState} from "react";

export default function About() {
    const [name, setName] = useState('');

    useEffect(() => {
        fetch(`${process.env.API_URL}/hello`).then(e => e.json()).then(response => {
            setName(response.name)
        })
    }, []);

    return (
        <MainLayout>
            <Head>
                <title>О нас</title>
            </Head>
            <h1>About page</h1>
            <p>
                Name is {name}
            </p>
        </MainLayout>
    )
}
