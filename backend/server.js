const dotenv = require('dotenv').config({ path: './config/config.env' });
const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const connectDatabase = require('./config/database');
const { initSocket } = require('./utils/socket');
const server = http.createServer(app);
const express =require('express')
const path = require('path');


const port = process.env.PORT ; 
const env = process.env.NODE_ENV || 'development'; 
initSocket(server); 
connectDatabase();  

app.use('/api/v1', require('./routes/order.routes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// react code
// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// const RealTimeSales = () => {
//   const [sales, setSales] = useState(0);

//   useEffect(() => {
//     const socket = io('http://localhost:5000');  // Replace with your server's URL

//     // Listen for 'sales-update' event to get updated total sales
//     socket.on('sales-update', (newSales) => {
//       setSales(newSales);
//     });

//     // Clean up the socket connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h3>Real-Time Sales: ${sales}</h3>
//     </div>
//   );
// };
// export default RealTimeSales;



// // Listen for connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Listen for events from the client (if needed)
//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });



// unhandled promise rejection eror
process.on('unhandledRejection', err =>{ 
  console.log(`Error : ${err.message}`)
  console.log("shutting down the server due to handled error");
  server.close(()=>{
      process.exit(1)
  })
})


// handle uncaught exceptions
process.on("uncaughtException", err=>{
  console.log(`Message : ${err.message}`)
  console.log("shutting down the server due to uncaughtException");
  process.exit(1)

}) 

 
 
app.listen(port,'0.0.0.0', () => { 
  console.log(`Server is running on port ${port} in ${env} mode`);
}); 