# NEWO subgraph

The Graph protocol subgraph for NEWO on Avalanche

## Development

To pull the code:

```
git clone https://github.com/new-order-network/newo-avalanche-subgraph
cd newo-avalanche-subgraph
```

To download necessary modules:

```
npm install
```

To build the graph after making changes to schema.graphql:

```
npm run codegen
```

To build after making TypeScript changes:

```
npm run build
```

To deploy to Subgraph Studio so you can sync and use the playground to query against the graph:

```
npm run deploy
```

## Deployments

Hosted: https://thegraph.com/hosted-service/subgraph/new-order-network/new-order-avalanche
