// server/server.js
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();
const port=process.env.PORT||3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/ccavenuePayment',(req,res) => {
    console.log(req);
   
  res.writeHead(302, {
    Location: 'http://localhost:3000/payment-request'
});
res.end();

});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});