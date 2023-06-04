import { useRef } from 'react';

export default function AddLikeButton() {

    const nameInput = useRef();

    const handleAddLike = (e) => {
        e.preventDefault();
        const reqBody = {
            name: nameInput.current.value,
            liked: true
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
            <button>Like</button>    
        </form>
    )
}