# Microfrontend - Host (SolidJS)

This is the application hosting a remote component

## Installation

Run ```nvm i``` to install the required node version (16)

Run ```yarn``` to install the packages

## Development

```yarn start:live``` starts a live-server on localhost:8080

To see the remote component, you need to start the remote server as well.

## Deployment

```yarn run build``` will build a deployable bundle in ```/dist```, this can be hosted on any static file server.

If you want to host it please adjust the deployment address in the ```webpack.config.js``` on lines 10 and 52