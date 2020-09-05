import Router from 'next/router';
import Link from 'next/link';
import {MainLayout} from '../../layout/main';
import {PostType} from "../../@types/post";

type PostsType = {
    posts: PostType[]
}

export default function Posts({ posts = [] }: PostsType) {
    return (
        <MainLayout>
            <h1>
                Posts
            </h1>
            <ul>
                {
                    posts.map(e => {
                        return <li key={e.id}>
                            <Link href={`posts/[id]`} as={`posts/${e.id}`}>
                                <a>
                                    {e.title}
                                </a>
                            </Link>
                        </li>
                    })
                }
            </ul>
            <button onClick={() => {Router.push('/')}}>
                Back home
            </button>
        </MainLayout>
    )
}

Posts.getInitialProps = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts: PostType[] = await response.json();

    return {
        posts
    }
};
