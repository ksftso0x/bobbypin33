import { createGlobalState } from 'react-hooks-global-state';

const {setGlobalState, useGlobalState} = createGlobalState(
    {
       contract:null,   
       provider:null,
       chain:0,
       account:null,
    }
);
export {useGlobalState, setGlobalState};