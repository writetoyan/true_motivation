import { useRef, useState } from 'react';

export default function AddLikeButton() {

    const nameInput = useRef();
    const [like, setLike] = useState(false)

    const handleAddLike = (e) => {
        e.preventDefault();
        const reqBody = {
            name: nameInput.current.value,
            liked: like
        }
        fetch('api/likes', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {response.json()})
        .then(data => console.log(data))
    }

    return (
        <form onSubmit={handleAddLike}>
            <input type='text' id='name' ref={nameInput}/>
            <button onClick={() => setLike(true)}>Like</button>    
            <button onClick={() => setLike(false)}>Dislike</button>
        </form>
    )
}