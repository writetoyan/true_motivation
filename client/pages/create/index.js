import { useContext, useRef } from 'react';
import  web3Context from '../../store/context';
import classes from './create.module.css';

export default function Create() {

    const enemyInput = useRef();
    const judgeInput = useRef();
    const web3Ctx = useContext(web3Context)

    const createHandler = async (e) => {
        e.preventDefault();
        const createTx = await web3Ctx.motivatorFactory.createTrueMotivator(enemyInput.current.value, judgeInput.current.value)
        const createTxReceipt = await createTx.wait();
        console.log(createTxReceipt);

    }

    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <h2>How it works</h2>
                <hr></hr>
                <ul>
                    <li>Create a True Motivator Contract</li>
                    <li>Send fund to it</li>
                    <li>Ask your friend and relatives to encourage you with tips</li>
                    <li>Ask them to vote about the success or failure of your challenge</li>
                    <li>The Judge contract with get the result of the vote on chain</li>
                    <li>If it is a success, you get back your funds and the tips from your friends</li>
                    <li>If not, all the funds will be sent to your worst enemy</li>
                </ul>
            </div>
            <div className={classes.card}>
                <h2>It's time to get things done!</h2>
                <hr />
                <form className={classes.form} onSubmit={createHandler}>
                    <input type="text" placeholder="Address of your worst enemy" ref={enemyInput}></input>
                    <input type="text" placeholder="Address of the Motivator Judge" ref={judgeInput}></input>
                    <button>CREATE</button>
                </form>
            </div>
          
        </div>
    )
}