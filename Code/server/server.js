
// server/server.js
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const ccav=require("../src/pages/commons/ccavutil.js");
// const ccav = require('../commons/ccavutil.js');
const app=express();
const port=process.env.PORT||3001;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/ccavenuePayment',(req,res) => {
  const encResp=req.body.encResp;
  const workingKey="65A0242CD1D57D3004836C3BB5532B12";
  const decryptedData=ccav.decrypt(encResp, workingKey);
  const list=decryptedData.split("&");
  let queryString="";
  let url="";
  if (list[3]=="order_status=Success") {
    queryString=list[0]+"&"+list[1]+"&"+list[2]+"&"+list[3]+"&"+list[10];
    queryString=queryString+"&"+list[40];
    url="http://localhost:3000/payment-success?"+queryString;
  } else {
    queryString=list[0]+"&"+list[1]+"&"+list[3];
    url="http://localhost:3000/payment-cancel?"+queryString;
  }
  res.writeHead(302, {
    Location: url,
  });
  res.end();

});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});