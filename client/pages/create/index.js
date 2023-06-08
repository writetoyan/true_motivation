import { useContext, useRef, useState, useEffect } from 'react';
import  web3Context from '../../store/context';
import classes from './create.module.css';

export default function Create() {

    const enemyInput = useRef();
    const judgeInput = useRef();
    const descriptionInput = useRef();
    const [motivatorId, setMotivatorId] = useState();
    const web3Ctx = useContext(web3Context)

    useEffect(() => {
        const init = async () => {
            fetch('api/true-motivators')
            .then(response => response.json())
            .then(data => setMotivatorId(data.motivatorList.length))
        }
        init();
    }, [])

    const createHandler = async (e) => {
        e.preventDefault();
        try {
            const createTx = await web3Ctx.motivatorFactory.createTrueMotivator(enemyInput.current.value, judgeInput.current.value)
            const createTxReceipt = await createTx.wait();
            console.log(createTxReceipt);
            const reqBody = {
                motivatorId: motivatorId,
                description: descriptionInput.current.value
            }
            fetch('api/true-motivators', {
                method: 'POST',
                body: JSON.stringify(reqBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => console.log(data));
        } catch (error) {
            console.error(error);
        }
     
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
                <br />
                <hr></hr>
                <p>If you don't know any Motivator Judge, the one we are working with is</p>
                <p>0x0440d558fC8B74725fa752AB8356975d564ef1f3</p>
            </div>
            <div className={classes.card}>
                <h2>It's time to get things done!</h2>
                <hr />
                <form className={classes.form} onSubmit={createHandler}>
                    <input type="text" placeholder="Address of your worst enemy" ref={enemyInput}></input>
                    <input type="text" placeholder="Address of the Motivator Judge" ref={judgeInput}></input>
                    <textarea rows="5" placeholder="Description of you task" ref={descriptionInput}/>
                    <button>CREATE</button>
                </form>
            </div>
          
        </div>
    )
}