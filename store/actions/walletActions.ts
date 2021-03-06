import {walletConstants} from "../constants";
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

/*
 The export statement is used to export the only function in the file so that the function can be called using `walletsActions.connect()`
 */
export const walletActions = {
  connect, disconnect,
};

const provider = new WalletConnectProvider({
  rpc: {
    44787: "https://alfajores-forno.celo-testnet.org",
    42220: "https://forno.celo.org",
  },
});

/*
This function is a simple method provided by Celo to connect to the Valora or Alfajores (for testing) wallet.
The `dispatch()` is a redux function which is used to emit actions which we can then listen for in the reducer and update the state accordingly.
*/
function connect(navigation) {
  return (dispatch: any) => {
    // This dispatch calls a function that is declared later on in the code.
    let asyncConnect = async() => {
      await provider.enable();
      const web3 = new Web3(provider);
      let kit = newKitFromWeb3(web3)
      kit.defaultAccount = provider.accounts[0]
      let asyncGetData = async() => {
        const stableToken = await kit.contracts.getStableToken();
        const goldToken = await kit.contracts.getGoldToken();
        const cUsdBalanceObj = await stableToken.balanceOf(kit.defaultAccount);
        const goldBalanceObj = await goldToken.balanceOf(kit.defaultAccount);
        const res = {address:kit.defaultAccount, cUsd:cUsdBalanceObj/10**18, celo:goldBalanceObj/10**18};
        dispatch(success(res));
        navigation.navigate('TabTwo');
      }
      provider.on("accountsChanged", (accounts) => {
        asyncGetData();
      });
    }
    dispatch(request('Connecting to wallet'));
    asyncConnect();
  };

  //These are the function calls which are dispatched when the user makes a request. The state of the app changes with the status of the request response.
  function request(message: string) {
    return { type: walletConstants.CONNECT_REQUEST, message };
  }
  function success(res: object) {
    return { type: walletConstants.CONNECT_SUCCESS, res };
  }
  function failure(error: any) {
    return { type: walletConstants.CONNECT_FAILURE, error };
  }
}

function disconnect() {
  return (dispatch: any) => {
    // This dispatch calls a function that is declared later on in the code.
    let asyncDisconnect = async() => {
        await provider.disconnect();
    }
    dispatch(requestDisconnect('Disconnecting from wallet'));
    asyncDisconnect();
    };
    function requestDisconnect(message: string) {
      return { type: walletConstants.DISCONNECT_REQUEST, message };

    }
}