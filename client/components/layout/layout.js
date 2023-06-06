import Navbar from './navbar';
import Sidebar from './sidebar';
import classes from './layout.module.css'

export default function Layout(props) {
    return (
        <div className={classes.layout_container}>
            <Navbar />
            <div className={classes.content_container}>
                <Sidebar />
                <div className={classes.content}>
                 {props.children}
                </div>
            </div>
        </div>
    )
}