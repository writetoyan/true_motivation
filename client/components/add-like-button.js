import { useRef, useState } from 'react';
import classes from './add-like-button.module.css';

export default function AddLikeButton() {

    const nameInput = useRef();
    const motivatorIdInput = useRef();
    const [like, setLike] = useState(false)

    const handleAddLike = (e) => {
        e.preventDefault();
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
        .then(data => console.log(data))
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