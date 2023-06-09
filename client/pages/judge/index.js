import * as judgeJson from '../../utils/MotivatorJudge.json';
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

export default function Judge() {

    const [source, setSource] = useState()

    useEffect(() => {
        const init = () => {
            fetch('api/source')
            .then(response => response.text())
            .then(data => setSource(data))
        }
        init();
    })

    const handleClick = async () => {
        const requestGas = 5500000;
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const subscriptionId = "412";
        const gasLimit = 300000;
        const judgeContract = new ethers.Contract("0x0440d558fC8B74725fa752AB8356975d564ef1f3", judgeJson.abi, signer)
        const requestTx = await judgeContract.executeRequest(
            source,
            "0x",
            [],
            subscriptionId,
            gasLimit,
            {gasLimit: requestGas}
        )
        await requestTx.wait();
    }

    const handleClick2 = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const judgeContract = new ethers.Contract("0x0440d558fC8B74725fa752AB8356975d564ef1f3", judgeJson.abi, signer)
        const tx = await judgeContract.latestResponse();
        console.log(tx)
    }

    return(
        <>
            <button onClick={handleClick}>
                Judge
            </button>
            <button onClick={handleClick2}>
                response
            </button>
        </>
    )
}