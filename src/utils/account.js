import {useState, useEffect} from 'react'

export const useAccount = ({web3}) => {
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function initAccount() {
      try {
        if (web3) {
          const accounts = await web3.eth.getAccounts()
          setError(null)
          setAccount(accounts[0])
        } else {
          throw new Error('web3 not initialized')
        }
      } catch (err) {
        setAccount(null)
        setError(err.message)
      }
    }

    initAccount()
  }, [web3])

  return {account, accountError: error}
}
