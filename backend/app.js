const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//     origin: 'http://localhost:3000', 
//     credentials: true  
// }));


const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173' , 'http://localhost:5174'];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);



// import all routes
const products = require("./routes/product.routes");
const errorMiddleWire = require('./middlewares/errors.middleware');
const auth = require('./routes/auth.routes');
const order = require('./routes/order.routes');
const user = require('./routes/user.routes');
const categoryRoutes = require('./routes/category.routes');
const adRoutes = require("./routes/ad.routes");
const packageRoutes = require("./routes/package.routes");
const storeRotues = require("./routes/store.routes");
const discountRoutes = require('./routes/discount.routes');
const reviewRoutes = require('./routes/review.routes');


app.get('/' , (req, res)=>{
    res.send("Helo world");
})

app.use('/api/v1', auth);  //done only forgot pass pending
app.use('/api/v1/store', storeRotues);   //done only forgot pass pending
app.use("/api/v1", products);  //done only bulk and single product pending
app.use('/api/v1/discount' , discountRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/order',order);
app.use('/api/v1',user);
app.use('/api/v1', categoryRoutes);  //done only delete sub category pending
app.use("/api/v1/ads", adRoutes);  //done all
app.use("/api/v1/package", packageRoutes); 

app.use(errorMiddleWire)

module.exports = app;
