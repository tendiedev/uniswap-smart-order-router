export enum ChainId {
  TENET_TESTNET = 155,
  TENET = 1559,
}

type ChainAddresses = {
  v3CoreFactoryAddress: string;
  multicallAddress: string;
  quoterAddress: string;
  v3MigratorAddress?: string;
  nonfungiblePositionManagerAddress?: string;
  tickLensAddress?: string;
  swapRouter02Address?: string;
  v1MixedRouteQuoterAddress?: string;
};

export const NETWORKS_WITH_SAME_UNISWAP_ADDRESSES: ChainId[] = [];

const TENET_TESTNET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0x884402DfdEf9702dBA7fF8dDdF62AbD6afffb28b',
  multicallAddress: '0xeD380115259FcC9088c187Be1279678e23a6E565',
  quoterAddress: '0x748e48759273F61Fef40C193a9B7bbEFf795f781',
  v3MigratorAddress: '0x5C6636EaB7891A429cd0014e33e3482835A6170D',
  nonfungiblePositionManagerAddress:
    '0x2dc114c0DEf2BC849996756E691FC6e8339649E1',
  tickLensAddress: '0x7173A75d23623eeAa6FEA39E9d043f6A52f87Cf9',
  swapRouter02Address: '0x5bd1F6735B80e58aAC88B8A94836854d3068a13a',
};

const TENET_ADDRESSES: ChainAddresses = {
  v3CoreFactoryAddress: '0xc7Bd8285676703836c1178e70384B72136F15542',
  multicallAddress: '0x220E9001f2E2beb3c082ffA853B16aB2b69E4694',
  quoterAddress: '0x121181A32327135cF38B3FfFd4ca3Eb1033cd7fd',
  v3MigratorAddress: '0xa77bB65303df60E6A7a8c81657A30AA4DF90bbA8',
  nonfungiblePositionManagerAddress:
    '0x130d60c78Dd2cA208fE2FAB1f41d269614Ab7e3d',
  tickLensAddress: '0x178631c5fff72601742b132E4734Fd3F43c14018',
  swapRouter02Address: '0x22b1Adc33b3f97f44c5BB58392d4C95f19CC3c0d',
};

export const SUPPORTED_CHAINS = [
  ChainId.TENET_TESTNET,
  ChainId.TENET,
] as const;
export type SupportedChainsType = typeof SUPPORTED_CHAINS[number];

export const CHAIN_TO_ADDRESSES_MAP: Record<
  SupportedChainsType,
  ChainAddresses
> = {
  [ChainId.TENET_TESTNET]: TENET_TESTNET_ADDRESSES,
  [ChainId.TENET]: TENET_ADDRESSES,
};
