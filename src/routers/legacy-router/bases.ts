/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Token } from '@tendieswap/sdk-core';

import {
  DAI_TENET,
  ITokenProvider,
  USDC_TENET,
  USDC_TENET_TESTNET,
  USDT_TENET,
  TENDIE_TENET
} from '../../providers/token-provider';
import { ChainId } from '../../util/chain-to-addresses';
import { WRAPPED_NATIVE_CURRENCY } from '../../util/chains';

type ChainTokenList = {
  readonly [chainId in ChainId]: Token[];
};

export const BASES_TO_CHECK_TRADES_AGAINST = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _tokenProvider: ITokenProvider
): ChainTokenList => {
  return {
    [ChainId.TENET_TESTNET]: [
      WRAPPED_NATIVE_CURRENCY[ChainId.TENET_TESTNET]!,
      USDC_TENET_TESTNET,
    ],
    [ChainId.TENET]: [
      WRAPPED_NATIVE_CURRENCY[ChainId.TENET]!,
      DAI_TENET,
      USDC_TENET,
      USDT_TENET,
      TENDIE_TENET
    ],
  };
};


export const ADDITIONAL_BASES = async (
  tokenProvider: ITokenProvider
): Promise<{
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
}> => {
  if (!tokenProvider) {
    return { [ChainId.TENET]: {} };
  }
  return {
    [ChainId.TENET]: {},
  };
};


/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES = async (
  tokenProvider: ITokenProvider
): Promise<{
  [chainId in ChainId]?: { [tokenAddress: string]: Token[] };
}> => {
  if (!tokenProvider) {
    return { [ChainId.TENET]: {} };
  }
  return {
    [ChainId.TENET]: {},
  };
};
