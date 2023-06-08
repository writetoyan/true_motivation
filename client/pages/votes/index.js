import MotivatorList from '../../components/motivator-list';
import { useState, useEffect } from 'react';
import AddLikeButton from '../../components/add-like-button';

export default function Votes() {

    const [motivatorList, setMotivatorList] = useState([]);

    useEffect(() => {
        const init = async () => {
            fetch('api/true-motivators')
            .then(response => response.json())
            .then(data => setMotivatorList(data.motivatorList))
        }
        init();
    }, [])

    return (
        <>
            <AddLikeButton />
            <MotivatorList motivatorList={motivatorList}/>
        </>
    )

}