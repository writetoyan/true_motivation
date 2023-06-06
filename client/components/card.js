import classes from './card.module.css'

export default function Card() {
    return (
        <div className={classes.card}>
            <div className={classes.header}>
                <h2 className={classes.title}>Card Title</h2>
            </div>
            <div className={classes.body}>
                <p>Card body content goes here.</p>
            </div>
            <div className={classes.actions}>
                <button className={classes.button}>Action 1</button>
                <button className={classes.button}>Action 2</button>
            </div>
        </div>

    )
}