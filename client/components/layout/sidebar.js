import classes from './sidebar.module.css';
import Link from 'next/link';

export default function Sidebar() {
    return (
        <div className={classes.sidebar}>
           <h2>
                ACTIONS
           </h2>
           <hr />
           <div className={classes.link}>
                <Link href="/create">Create a motivator</Link>
           </div>
           <div className={classes.link}>
                <Link href="/lock">Lock fund to motivator</Link>
           </div>
           <div className={classes.link}>
                <Link href="/votes">Like/dislike execution</Link>
           </div>

        </div>
    )
}