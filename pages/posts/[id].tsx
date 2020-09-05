import {useState, useEffect} from 'react'
import Router, {useRouter} from 'next/router';
import {MainLayout} from '../../layout/main';
import {NextPageContext} from "next";
import {PostType} from "../../@types/post";

type PostPropsType = {
    post: PostType
}

export default function Post({ post: serverPost }: PostPropsType) {
    const [post, setPost] = useState(serverPost);
    const router = useRouter();
    const { query } = router;

    useEffect( () => {
        async function load() {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
            const json = await response.json();
            setPost(json);
        }

        if (!serverPost) {
            load();
        }
    }, []);

    if (!post) {
        return (
            <MainLayout>
                <p>
                    Loading ...
                </p>
            </MainLayout>
        )
    }

    return (
        <MainLayout>
            <h1>
                Post: {post.title}
            </h1>
            <hr/>
            <p>
                {
                    post.body
                }
            </p>
            <button onClick={() => {Router.push('/posts')}}>
                Back to posts
            </button>
        </MainLayout>
    )
}

// only server side
// Post.getInitialProps = async (ctx) => {
//     const {query, req} = ctx;
//
//     if (!req) {
//         return {
//             post: null
//         }
//     }
//
//     const post = await new Promise(async (resolve) => {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
//         const json = await response.json();
//         setTimeout(() => {
//             resolve(json);
//         }, 1500);
//     });
//
//     return {
//         post
//     }
// };

// only server side
interface NextPageContextType extends NextPageContext {
    query: {
        id: string
    }
}

export async function getServerSideProps(ctx: NextPageContextType) {
    const {query} = ctx;

    const post: PostType = await new Promise(async (resolve) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`);
        const json = await response.json();
        setTimeout(() => {
            resolve(json);
        }, 1500);
    });

    return {
        props: {
            post
        }
    }
}
