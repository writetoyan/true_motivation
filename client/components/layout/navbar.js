import classes from './navbar.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className={classes.navbar}>
            <div className={classes.title}><Link href="/">True Motivation</Link></div>
            <div className={classes.connect}>
                <ConnectButton />
            </div>
        </div>
    )
}