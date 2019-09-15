import {useState, useEffect} from 'react'
import Web3 from 'web3'

export const useWeb3 = () => {
  const [web3, setWeb3] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        if (window.ethereum) {
          setError(null)
          await window.ethereum.enable()
          setWeb3(new Web3(window.ethereum))
        } else if (window.web3) {
          setError(null)
          setWeb3(new Web3(window.web3.currentProvider))
        } else {
          throw new Error(
            'Non-Ethereum browser detected. You should consider trying MetaMask!',
          )
        }
      } catch (err) {
        setWeb3(null)
        setError(err.message)
      }
    }
    
    initWeb3()
  }, [])

  return {web3, web3Error: error}
}
