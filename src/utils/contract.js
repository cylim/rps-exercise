import {useState, useEffect} from 'react'

export const useContract = ({web3, config}) => {
  const [contract, setContract] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function initContract() {
      try {
        if (web3 && config) {
          const networkId = await web3.eth.net.getId()
          const networkData = config.networks[networkId]
          if (networkData) {
            const contract = new web3.eth.Contract(config.abi, networkData.address)
            setError(null)
            setContract(contract)
          } else {
            throw new Error(`${config.contractName} not deployed to detected network.`)
          }
        }
      } catch (err) {
        setContract(null)
        setError(err.message)
      }
    }

    initContract()
  }, [web3, config])

  return {contract, contractError: error}
}
