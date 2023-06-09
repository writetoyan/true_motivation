import Navbar from './navbar';
import Sidebar from './sidebar';
import classes from './layout.module.css'
import NotificationContext from '../../store/notification-context';
import Notification from './notification';
import { useContext } from 'react';


export default function Layout(props) {

    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;

    return (
        <div className={classes.layout_container}>
            <Navbar />
            <div className={classes.content_container}>
                <Sidebar />
                <div className={classes.content}>
                 {props.children}
                </div>
            </div>
            {activeNotification && (
            <Notification
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status}
            />
      )}
        </div>
    )
}