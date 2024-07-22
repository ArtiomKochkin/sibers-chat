# Real-time chat

## About
The project is a real-time chat that allows users to send and receive messages from each other in a common channel.

Backend is located in the server folder, and the Frontend is in the client folder.

## Getting started
To get the frontend running locally:

1. Clone this repo

2. Go to the "server" folder

3. `npm install` to install all the dependencies defined in a package.json file.

4. `npm start` to start the server

5. Go to the "client" folder

6. `npm install` to install all the dependencies defined in a package.json file.

7. `npm run dev` to start the Vite dev server.

## Stack

- FSD (Feature sliced design) as an architectural methodology
- Vite as a build tool
- React Library
- CSS Modules for styling
- Various auxiliary libraries for the frontend:
  - socket.io-client to work with WebSocket on the client
  - react-router-dom v6 for routing
  - react-icons for interface icons
- Various auxiliary libraries for the backend (cors, express, socket.io)