import Link from 'next/link';
import styles from '../styles/Layout.module.scss'

export function MainLayout({ children }) {
    return (
        <div className={styles.container}>
            <nav>
                <ul className={styles.nav}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                    <li>
                        <Link href="/posts">Posts</Link>
                    </li>
                </ul>
            </nav>
            <hr/>
            <main>
                { children }
            </main>
        </div>
    )
}
