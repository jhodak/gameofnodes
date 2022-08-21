# Welcome to Remix!

- [Remix Docs](https://remix.run/docs)

## Development

From your terminal:

Install pnpm rather than npm
```sh
npm install -g pnpm
```

```sh
pnpm run dev
```

This starts your app in development mode, rebuilding assets on file changes.  This should be all you need for running locally.

## Deployment

To run the app in production mode, such as on a server, you will also need pm2 installed.

```sh
pnpm i pm2
```

Finally to be able to run in production simply use the start command, this will first build, then start the application on port 3005, you can change this to a port of your choosing (port 3000 is default if you omit the PORT=3005 from the build command).

```sh
pnpm start
```
