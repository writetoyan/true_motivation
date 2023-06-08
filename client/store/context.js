import { createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import * as motivatorFactoryJson from '../utils/MotivatorFactory.json';

const web3Context = createContext({});

export function Web3ContextProvider(props) {

    const [motivatorFactory, setMotivatorFactory] = useState();

    let provider, signer;

    useEffect(() => {
        const init = async () => {
            provider = new ethers.providers.Web3Provider(ethereum);
            signer = provider.getSigner();
            const motivatorFactoryContract = new ethers.Contract("0xF8aE468A035631D10F71CD7981fc4FdcF75e4e08", motivatorFactoryJson.abi, signer)
            setMotivatorFactory(motivatorFactoryContract);
        }
        init();
    }, [])
    
    const context = {
        motivatorFactory: motivatorFactory,
    }

    return (
        <web3Context.Provider value={context}>
            {props.children}
        </web3Context.Provider>
    )
}

export default web3Context;