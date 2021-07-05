import { web3Loaded, web3AccountLoaded, tokenLoaded, exchangeLoaded } from './actions'
import Web3 from 'web3'
import Token from '../abis/Token.json'
import Exchange from '../abis/Exchange.json'

export const loadWeb3 = (dispatch) => {
	const connection = new Web3(Web3.givenProvider || 'http://localhost:7545')
	dispatch(web3Loaded(connection))
	return connection
}

export const loadAccount = async (web3, dispatch) => {
	const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
	const account = accounts[0]
	dispatch(web3AccountLoaded(account))
	return account
}

export const loadToken = async (web3, networkId, dispatch) => {
	try {
		const token = new web3.eth.Contract(Token.abi, Token.networks[networkId].address)
		dispatch(tokenLoaded(token))
		return token
	} catch (error) {
		console.log('Contract not deployed to the current network.  Please select another network with Metamask.')
		return null
	}
}

export const loadExchange = async (web3, networkId, dispatch) => {
	try {
		const exchange = new web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
		dispatch(exchangeLoaded(exchange))
		return exchange
	} catch (error) {
		console.log('Contract not deployed to the current network.  Please select another network with Metamask.')
		return null
	}
}