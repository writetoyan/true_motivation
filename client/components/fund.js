import classes from './fund.module.css';
import { useRef, useContext } from 'react'
import { ethers } from 'ethers';
import trueMotivatorJson from '../utils/TrueMotivator.json'
import web3Context from '../store/context';
import NotificationContext from '../store/notification-context';

export default function Fund() {

    const motivatorIdInput = useRef();
    const amountInput = useRef();
    const web3Ctx = useContext(web3Context);
    const notificationCtx = useContext(NotificationContext);

    const fundMotivator = async (e) => {
        e.preventDefault();
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const motivatorAddress = await web3Ctx.motivatorFactory.trueMotivators(motivatorIdInput.current.value);
            const trueMotivatorContract = new ethers.Contract(motivatorAddress, trueMotivatorJson.abi, signer)
            const amount = ethers.utils.parseEther(amountInput.current.value);
            const fundTx = await trueMotivatorContract.motivateMe(amount, {value: amount});
            notificationCtx.showNotification({
                title: "Funds",
                message: "Locking funds to the contract until you finish your challenge!",
                status: 'pending'
            })
            await fundTx.wait();
            notificationCtx.showNotification({
                title: "Success",
                message: "ETH locked! Finish yor challenge to get them back!",
                status: 'success'
            })
        } catch (error) {
            notificationCtx.showNotification({
                title: "Failed",
                message: error.message || "Something went wrong!",
                status: 'error'
            })
        }
    }

    return(
        <div className={classes.container}>
            <div className={classes.card}>
                <h2>Fund a motivator</h2>
                <hr />
                <form onSubmit={fundMotivator}> 
                    <input placeholder="Motivator ID" ref={motivatorIdInput}></input>
                    <input placeholder="Amount to lock" ref={amountInput}></input>
                    <button>Fund</button>
                </form>
            </div>  
        </div>
    )
}