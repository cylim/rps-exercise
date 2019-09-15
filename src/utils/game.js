import {useState} from 'react'
import RPS from '../abis/RPS.json'


export const useGame = ({web3, account, hasher}) => {
  const [output, setOutput] = useState('')
  const [history, setHistory] = useState([])

  const createGame = async ({move, salt, player, bet}) => {
    try {
      if (!player || !web3.utils.isAddress(player)) {
        throw new Error('Player address incorrect')
      }
      const c1Hash = await hasher.methods.hash(move, salt).call()
      const contract = new web3.eth.Contract(RPS.abi)
      const result = await contract
        .deploy({
          data: RPS.bytecode,
          arguments: [c1Hash, player],
        })
        .send({
          from: account,
          value: web3.utils.toWei(bet.toString(), 'ether'),
        })
      setHistory([`created: ${result._address}`, ...history])

      setOutput(
        `Please send address: ${result._address} to the player. \nDon't forget your salt value.`,
      )
    } catch (err) {
      setOutput('')
      alert(err.message)
    }
  }

  const joinGame = async ({address, move}) => {
    try {
      if (!address || !web3.utils.isAddress(address)) {
        throw new Error('Contract address incorrect')
      }
      const contract = new web3.eth.Contract(RPS.abi, address)
      const lastMove = await contract.methods.getLastMove().call()
      if (+lastMove > 0) {
        throw new Error('You had played the game, wait for the host to solve it or use the timeout function')
      }
      
      const stake = await contract.methods.getStake().call()
      if (+stake === 0) {
        throw new Error('The game is solved or timeout')
      }

      await contract.methods.play(move).send({
        from: account,
        value: stake,
      })
      setHistory([`played move-${move}: ${address}`, ...history])
      
    } catch (err) {
      alert(err.message)
    }
  }
  
  const solveGame = async ({address, move, salt}) => {
    try {
      if (!address || !web3.utils.isAddress(address)) {
        throw new Error('Contract address incorrect')
      }
      if (!salt) {
        throw new Error('Salt value must be provided for solving the game')
      }
      
      const contract = new web3.eth.Contract(RPS.abi, address)
      const lastMove = await contract.methods.getLastMove().call()
      if(+lastMove === 0) {
        throw new Error('player 2 not yet make it move.')
      }
      const stake = await contract.methods.getStake().call()
      if(stake === 0) {
        throw new Error('The game is solved or timeout')
      }

      await contract.methods.solve(move, salt).send({
        from: account,
      })
      setHistory([`solved: ${address}`, ...history])
    } catch (err) {
      alert(err.message)
    }
  }
  
  const timeoutGame = async ({address}) => {
    try {
      if (!address || !web3.utils.isAddress(address)) {
        throw new Error('Contract address incorrect')
      }
      const contract = new web3.eth.Contract(RPS.abi, address)
      const isTimeout = await contract.methods.getTimeout().call()
      if(!isTimeout) {
        throw new Error('Not timeout yet')
      }

      const stake = await contract.methods.getStake().call()
      if (+stake === 0) {
        throw new Error('The game is solved or timeout')
      }

      const lastMove = await contract.methods.getLastMove().call()
      if(+lastMove === 0) {
        await contract.methods.j2Timeout().send({
          from: account
        })
      } else {
        await contract.methods.j1Timeout().send({
          from: account
        })
      }

      setHistory([`timeout: ${address}`, ...history])
    } catch (err) {
      alert(err.message)
    }
  }

  return {createGame, joinGame, solveGame, timeoutGame, output, history}
}
