import {walletConstants} from "../constants";

//T he initial state of the wallet
const initialState = {
  failed: true,
  connecting: false,
  message: '',
  address: '',
  cUsd: '',
  celo:''
};

// This is the wallet reducer which takes the state and action as parameters.
// It modifies the state accordingly based on the type of action that it receives from the dispatch calls in the `walletAction.ts` file
export function wallet(state = initialState, action: any) {
  switch (action.type) {
    case walletConstants.CONNECT_REQUEST:
      return {
        connecting: true,
        message: action.message,
      };
    case walletConstants.CONNECT_SUCCESS:
      return {
        failed: false,
        address: action.res.address,
        cUsd: action.res.cUsd,
        celo: action.res.celo
      };
    case walletConstants.CONNECT_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}