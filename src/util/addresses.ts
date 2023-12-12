import { Token } from '@tendieswap/sdk-core';
import { FACTORY_ADDRESS } from '@tendieswap/v3-sdk';

import { ChainId, CHAIN_TO_ADDRESSES_MAP, NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chain-to-addresses';


export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(FACTORY_ADDRESS),
  [ChainId.TENET_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET_TESTNET].v3CoreFactoryAddress,
  [ChainId.TENET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET].v3CoreFactoryAddress,
  // TODO: Gnosis + Moonbeam contracts to be deployed
};

export const QUOTER_V2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x61fFE014bA17989E743c5F6cB21bF9697530B21e'),
  [ChainId.TENET_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET_TESTNET].quoterAddress,
  [ChainId.TENET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET].quoterAddress,
  // TODO: Gnosis + Moonbeam contracts to be deployed
};

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.TENET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET].v1MixedRouteQuoterAddress,
};

export const UNISWAP_MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),
  [ChainId.TENET_TESTNET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET_TESTNET].multicallAddress,
  [ChainId.TENET]:
    CHAIN_TO_ADDRESSES_MAP[ChainId.TENET].multicallAddress,
  // TODO: Gnosis + Moonbeam contracts to be deployed
};

export const SWAP_ROUTER_02_ADDRESSES = (chainId: number): string => {
  if (chainId == ChainId.TENET) {
    return CHAIN_TO_ADDRESSES_MAP[ChainId.TENET].swapRouter02Address!;
  }
  return '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';
};

export const OVM_GASPRICE_ADDRESS =
  '0x420000000000000000000000000000000000000F';
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C';

export const MULTICALL2_ADDRESS = '0x220E9001f2E2beb3c082ffA853B16aB2b69E4694';

export type AddressMap = { [chainId: number]: string | undefined };

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(
    additionalNetworks
  ).reduce<{
    [chainId: number]: T;
  }>((memo, chainId) => {
    memo[chainId] = address;
    return memo;
  }, {});
}

export const WETH9: {
  [chainId in Exclude<
    ChainId,
    | ChainId.TENET_TESTNET
    | ChainId.TENET
  >]: Token;
} = {
  [ChainId.TENET_TESTNET]: new Token(
    ChainId.TENET_TESTNET,
    '0xF7c99B019424C7A89DAE252fD872F9b3EBe6cfaC',
    18,
    'wTNT',
    'Wrapped Tenet'
  ),
  [ChainId.TENET]: new Token(
    ChainId.TENET,
    '0xd6cb8a253e12893b0cF39Ca78F7d858652cCa1fe',
    18,
    'wTNT',
    'Wrapped Tenet'
  ),
};
