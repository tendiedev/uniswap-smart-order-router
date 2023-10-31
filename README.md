# Uniswap Smart Order Router - Tenet Network

This repository contains routing logic for the Uniswap V3 protocol.

It searches for the most efficient way to swap token A for token B, considering splitting swaps across multiple routes and gas costs.

This repository is published as an npmjs package. Even though this repo comes with a command-line tool, we don't use this in our routing setup. Our (Routing API)[https://github.com/tendiedev/uniswap-routing-api-main] imports this npmjs package for the routing logic.

The only time you would need to update this npmjs package is when the graph node url needs to be updated.
To update the graph node url, update `src/providers/v3/subgraph-provider.ts` with the new url near line 67.
Please update package version, and run

```shell
npm install
npm run build
npm publish --access public
```
