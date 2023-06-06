import classes from './navbar.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    return (
        <div className={classes.navbar}>
            <p>True Motivation</p>
            <div className={classes.connect}>
                <ConnectButton />
            </div>
        </div>
    )
}