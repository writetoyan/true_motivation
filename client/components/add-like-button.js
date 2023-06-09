import { useRef, useState, useContext } from 'react';
import classes from './add-like-button.module.css';
import NotificationContext from '../store/notification-context';

export default function AddLikeButton() {

    const nameInput = useRef();
    const motivatorIdInput = useRef();
    const [like, setLike] = useState(false)
    const notificationCtx = useContext(NotificationContext);
    

    const handleAddLike = (e) => {
        e.preventDefault();
        notificationCtx.showNotification({
            title: "Processing",
            message: "Saving your votes...",
            status: "pending"
          })
        const reqBody = {
            motivatorId: motivatorIdInput.current.value,
            name: nameInput.current.value,
            liked: like
        }
        fetch('api/likes/vote', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {response.json()})
        .then(data => {
            notificationCtx.showNotification({
                title: "Success",
                message: "Your vote is successfully regitered",
                status: "success"
              });
        }).catch(error => {
            notificationCtx.showNotification({
                title:"Failed",
                message: error.message || "Something went wrong!",
                status: "error"
            })
        })
    }

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <h2>Vote for the execution</h2>
                <hr />
                <form onSubmit={handleAddLike}> 
                    <div>
                        <input placeholder="Motivator ID" ref={motivatorIdInput}></input>
                        <input placeholder="Name" ref={nameInput}></input>
                    </div>
                    <div>
                        <button onClick={() => setLike(true)}>Likes</button>
                        <button onClick={() => setLike(false)}>Dislikes</button>
                    </div>
                </form>
            </div>  
        </div>

    )
}