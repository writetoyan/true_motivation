import judgeJson from '../../utils/MotivatorJudge.json';
import trueMotivatorJson from '../../utils/TrueMotivator.json';
import motivatorFactoryJson from '../../utils/MotivatorFactory.json';
import { ethers } from 'ethers'
import { useEffect, useState, useRef, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import web3Context from '../../store/context';
import classes from './judge.module.css';

export default function Judge() {

    const motivatorIdInput = useRef();
    const [source, setSource] = useState()
    const [trueMotivatorAddress, setTrueMotivatorAddress] = useState();
    const notificationCtx = useContext(NotificationContext);
    const web3Ctx = useContext(web3Context);

    useEffect(() => {
        const init = () => {
            fetch('api/source')
            .then(response => response.text())
            .then(data => setSource(data))
        }
        init();
    })

    const handleClick = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const motivatorFactoryContract = new ethers.Contract("0xF8aE468A035631D10F71CD7981fc4FdcF75e4e08", motivatorFactoryJson.abi, signer)
        const motivatorAddress = await motivatorFactoryContract.trueMotivators(motivatorIdInput.current.value);
        setTrueMotivatorAddress(motivatorAddress)
        console.log(trueMotivatorAddress)
        const requestGas = 5500000; 
        const subscriptionId = "412";
        const gasLimit = 300000;
        const judgeContract = new ethers.Contract("0x0440d558fC8B74725fa752AB8356975d564ef1f3", judgeJson.abi, signer)
        const requestTx = await judgeContract.executeRequest(
            source,
            "0x",
            [motivatorIdInput.current.value],
            subscriptionId,
            gasLimit,
            {gasLimit: requestGas}
        )
        notificationCtx.showNotification({
            title: 'Judge',
            message: 'Calling Chainlink Functions to get results on-chain',
            status: 'pending'
        })
        await requestTx.wait();
        notificationCtx.showNotification({
            title: 'Success',
            message: 'The judgment is done. Now execute it!',
            status: 'success'
        })
    }

    const handle = async () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const motivatorAddress = web3Ctx.motivatorFactory.trueMotivators(motivatorIdInput.current.value);
        setTrueMotivatorAddress(motivatorAddress)
        console.log(trueMotivatorAddress)
        const trueMotivatorContract = new ethers.Contract(trueMotivatorAddress, trueMotivatorJson.abi, signer)
        const tx = await trueMotivatorContract.getJudgeDecision();
        notificationCtx.showNotification({
            title: 'Execute',
            message: 'Executing decision of your actions',
            status: 'pending'
        })
        await tx.wait();
        notificationCtx.showNotification({
            title: 'Success',
            message: 'Decision executed!',
            status: 'success'
        })
        console.log(tx)
    }

    return(
        <div className={classes.container}>
            <div className={classes.card}>
                <h2>Get the result on chain</h2>
                <hr />
                <div>
                    <input placeholder='motivatorId' ref={motivatorIdInput}></input>
                    <button onClick={handleClick}>
                        Judge
                    </button>
                    <button onClick={handle}>
                        Execute
                    </button>
                </div>
            </div>
        </div>
    )
}