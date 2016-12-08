## Stock Sync - Web Sockets demo
Paul Hoskinson (plhosk@gmail.com)

- Enter a stock market symbol to create a chart.
- Add, move or delete charts in the list.
- Any changes you make are instantly synchronized with anyone else who is using the app.
- Try opening the app on multiple browsers or devices and watch the changes synchronize.

---

- Try the live version on Heroku: [https://stock-sync-plhosk.herokuapp.com/](https://stock-sync-plhosk.herokuapp.com/)
- Github Repository: [https://github.com/plhosk/stock-sync](https://github.com/plhosk/stock-sync)
- This app makes use of the [Quandl Wiki Stock Prices API](https://www.quandl.com/data/WIKI-Wiki-EOD-Stock-Prices/documentation/documentation).

---

### Main Technologies
- **Development**: Hot Reloading, Webpack, babel, yarn, eslint
- **Client**: React, Redux, redux-saga, socket.io
- **Server**: Node/Express, socket.io

### Technical Discussion
- Changes made in the client result in Redux actions being dispatched to the server.
- The server uses these actions to update its own copy of the redux store and broadcast it to all connected web sockets.
- The clients receive the updated store from the server in the form of a Redux action.
- Hot Reloading is enabled for live editing of all content types (React components, Sagas, and Redux reducers)

### Development Instructions
- Install [Node.js](https://nodejs.org/en/) and Git (optional)
- Clone or download the code from git repository: `git clone https://github.com/plhosk/stock-sync.git`
- Enter project folder: `cd stock-sync`
- Install npm packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URL to your node server (example: `SERVER_URL=http://localhost:3000`) and your [Quandl API key](https://www.quandl.com/data/WIKI-Wiki-EOD-Stock-Prices/documentation/documentation)
- Start the Node/Express web server: `npm start`
- The server provides Hot Reloading and dynamic webpack bundling in development mode. Alternatively you can build a static production bundle with `npm run build-prod` and start the production server with `npm run start-prod`
- Visit the server URL in your web browser (default port 3000): [http://localhost:3000](http://localhost:3000)
