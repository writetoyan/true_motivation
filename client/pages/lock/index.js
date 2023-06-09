import { useEffect, useState } from 'react';
import MotivatorList from '../../components/motivator-list';
import Fund from '../../components/fund';
import GetBalance from '../../components/getbalance';

export default function Lock() {

    const [motivatorList, setMotivatorList] = useState([]);

    useEffect(() => {
        const init = () => {
            fetch('api/true-motivators')
            .then(response => response.json())
            .then(data => setMotivatorList(data.motivatorList))
        }
        init();
    }, [])

    return(
        <>
            <Fund />
            <GetBalance />
            <MotivatorList motivatorList={motivatorList}/> 
        </>
    )
}