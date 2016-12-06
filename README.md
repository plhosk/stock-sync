## Stock Sync - Real-time Collaboration
Paul Hoskinson (plhosk@gmail.com)

- Enter a stock market symbol to create a chart.
- Set chart options such as time scale and chart style.
- Changes to chart settings (which charts are visible, individual chart options) will be synchronized in real-time to anyone else who is using the app.

---

- Try the live version on Heroku: [https://stock-sync-plhosk.herokuapp.com/](https://stock-sync-plhosk.herokuapp.com/)
- Github Repository: [https://github.com/plhosk/stock-sync](https://github.com/plhosk/stock-sync)
- This app makes use of the [cool api](https://cool.com/api).

---

### Main Technologies
- Client: React, Redux, redux-saga, Material UI, Web Sockets
- Server: Node/Express, Mongoose, Web Sockets

### Development Instructions
- Install [Node.js](https://nodejs.org/en/) and Git (optional)
- Clone or download the code from git repository: `git clone https://github.com/plhosk/stock-sync.git`
- Enter project folder: `cd stock-sync`
- Install node packages: `npm install`
- Rename the file ".env.example" in your project directory to ".env" and add the URI to your MongoDB database collection (example: `MONGO_URI=mongodb://localhost/nightlife`)
- Build the client bundle with Webpack: `npm run build` (or `npm run prod` for production)
- Start the Node/Express web server: `npm start`
- Visit the server URL in your web browser (default port 3000): [http://localhost:3000](http://localhost:3000)
