import classes from './getbalance.module.css';
import { useRef, useContext, useState } from 'react';
import web3Context from '../store/context';
import { ethers } from 'ethers'

export default function GetBalance() {

    const [active, setActive] = useState(false)
    const [balance, setBalance] = useState()
    const motivatorId = useRef()
    const web3Ctx = useContext(web3Context);

    const revealBalance = async (e) =>  {
        e.preventDefault();
        if (!motivatorId.current.value) {
            return;
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const motivatorAddress = await web3Ctx.motivatorFactory.trueMotivators(motivatorId.current.value);
        const balance = await provider.getBalance(motivatorAddress);
        const formatedBalance = Number((ethers.utils.formatEther(balance))).toFixed(2)
        setBalance(formatedBalance);
        setActive(true)
    }
    
    return(
        <div className={classes.container}>
            <div className={classes.card}>
                <h2>Reveal amount locked</h2>
                <hr />
                <form onSubmit={revealBalance}> 
                    <input placeholder="Motivator ID" ref={motivatorId}></input>
                    <button>Reveal</button>
                </form>
                <div>
                    {active && 
                    <p>{`${balance} ETH`}</p>}
                </div>
            </div>  
           
        </div>
    )
}