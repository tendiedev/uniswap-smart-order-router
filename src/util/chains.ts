import { Currency, Ether, NativeCurrency, Token } from '@tendieswap/sdk-core';

import { ChainId } from './chain-to-addresses';

export const V2_SUPPORTED = [ChainId.TENET, ChainId.TENET_TESTNET];

export const HAS_L1_FEE = [
  ChainId.TENET_TESTNET,
  ChainId.TENET,
];
export const ID_TO_CHAIN_ID = (id: number): ChainId => {
  switch (id) {
    case 155:
      return ChainId.TENET_TESTNET;
    case 1559:
      return ChainId.TENET;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export enum ChainName {
  TENET_TESTNET = 'tenet-testnet',
  TENET = 'tenet-mainnet',
}

export enum NativeCurrencyName {
  TENET = 'TENET',
}

export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.TENET_TESTNET]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
  [ChainId.TENET]: [
    'ETH',
    'ETHER',
    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
  ],
};

export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrencyName } = {
  [ChainId.TENET_TESTNET]: NativeCurrencyName.TENET,
  [ChainId.TENET]: NativeCurrencyName.TENET,
};

export const ID_TO_NETWORK_NAME = (id: number): ChainName => {
  switch (id) {
    case 155:
      return ChainName.TENET_TESTNET;
    case 1559:
      return ChainName.TENET;
    default:
      throw new Error(`Unknown chain id: ${id}`);
  }
};

export const CHAIN_IDS_LIST = Object.values(ChainId).map((c) =>
  c.toString()
) as string[];

export const ID_TO_PROVIDER = (id: ChainId): string => {
  switch (id) {
    case ChainId.TENET_TESTNET:
      return process.env.JSON_RPC_PROVIDER_TENET_TESTNET!;
    case ChainId.TENET:
      return process.env.JSON_RPC_PROVIDER_TENET!;
    default:
      throw new Error(`Chain id: ${id} not supported`);
  }
};

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.TENET_TESTNET]: new Token(
    ChainId.TENET_TESTNET,
    '0xF7c99B019424C7A89DAE252fD872F9b3EBe6cfaC',
    18,
    'WTENET',
    'Wrapped Tenet'
  ),
  [ChainId.TENET]: new Token(
    ChainId.TENET,
    '0xd6cb8a253e12893b0cF39Ca78F7d858652cCa1fe',
    18,
    'WTENET',
    'Wrapped Tenet'
  ),
};

function isTenet(
  chainId: number
): chainId is ChainId.TENET {
  return chainId === ChainId.TENET;
}

class TenetNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId;
  }

  get wrapped(): Token {
    if (!isTenet(this.chainId)) throw new Error('Not tenet');
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId];
    if (nativeCurrency) {
      return nativeCurrency;
    }
    throw new Error(`Does not support this chain ${this.chainId}`);
  }

  public constructor(chainId: number) {
    if (!isTenet(chainId)) throw new Error('Not tenet');
    super(chainId, 18, 'TENET', 'TENET');
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WRAPPED_NATIVE_CURRENCY) {
      return WRAPPED_NATIVE_CURRENCY[this.chainId as ChainId];
    }
    throw new Error('Unsupported chain ID');
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } =
    {};

  public static onChain(chainId: number): ExtendedEther {
    return (
      this._cachedExtendedEther[chainId] ??
      (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
    );
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {};

export function nativeOnChain(chainId: number): NativeCurrency {
  if (cachedNativeCurrency[chainId] != undefined) {
    return cachedNativeCurrency[chainId]!;
  }
  if (isTenet(chainId)) {
    cachedNativeCurrency[chainId] = new TenetNativeCurrency(chainId);
  } else {
    cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId);
  }

  return cachedNativeCurrency[chainId]!;
}
