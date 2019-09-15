import React from 'react'
import './App.css'
import {Indicator} from './Indicator'
import {CreateComponent} from './CreateComponent'
import {JoinComponent} from './JoinComponent'
import {ActionComponent} from './ActionComponent'
import {HistoryComponent} from './HistoryComponent'
import {useWeb3} from '../utils/web3'
import {useContract} from '../utils/contract'
import {useAccount} from '../utils/account'
import {useGame} from '../utils/game'
import Hasher from '../abis/Hasher.json'

function App() {
  const {web3, web3Error} = useWeb3()
  const {account, accountError} = useAccount({web3})
  const {contract, contractError} = useContract({web3, config: Hasher})
  const {createGame, joinGame, solveGame, timeoutGame, output, history} = useGame({web3, account, hasher: contract}) 

  return (
    <div className="App">
      {web3Error ? <Indicator text={web3Error} /> : null}
      <Indicator
        text={accountError || `address: ${account}`}
        background={account ? 'green' : 'red'}
      />
      {contractError ? <Indicator text={contractError} /> : null}

      <CreateComponent handleAction={createGame} />
      {output ? <p>{output}</p> : null}
      
      <JoinComponent handleAction={joinGame} />
      <ActionComponent handleSolve={solveGame} handleTimeout={timeoutGame} />

      {history.length ? <HistoryComponent history={history} /> : null }
    </div>
  )
}

export default App
