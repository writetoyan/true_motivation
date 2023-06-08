import { useEffect, useState } from 'react';
import classes from './motivator-list.module.css';

export default function MotivatorList(props) {

    const { motivatorList } = props

    return (
        <div className={classes.card}>
        <table className={classes.table}> 
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {motivatorList.map((motivator, index) => (
                    <tr key={index}>
                        <td>{motivator.motivatorId}</td>
                        <td>{motivator.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )

}