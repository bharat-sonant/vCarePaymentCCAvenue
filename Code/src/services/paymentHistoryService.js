import dayjs from "dayjs";
import { getData, saveData } from "./dbService";
import { generateRandomString } from "./commonService";


export const getPaymentCollectionHistory=() => {
    return new Promise((resolve) => {
    const cardNo=localStorage.getItem('cardNo')
      const path="PaymentCollectionInfo/PaymentCollectionHistory/"+cardNo;
      getData(path).then((response) => {
        let list=[]
        if(response!==null){
            const yearArray=Object.keys(response);
            yearArray.forEach(year => {
               if(Number(year)){
                const monthArray=Object.keys(response[year]);
                monthArray.forEach(month=>{
                   const timeStamp=dayjs(`${year}-${month}`).valueOf();
                    let resp=response[year][month]
                    list.push({year:year,month:month,amount:resp.amount,status:resp.status,timeStamp:timeStamp});
                })
               }
            });
            list=list.sort((a,b)=>a.timeStamp>b.timeStamp?1:-1)
            resolve(list)
            
        }
        else{
            resolve (null)
        }
      })
        .catch((error) => {
            resolve(null)
        });
    });
  }
  export const saveCCAvenuePaymentRequestHistory=async(amount,monthYear) => {
    
    const cardNo=localStorage.getItem('cardNo');
    let newKey=1;
    const date=dayjs().format('YYYY-MM-DD');
    let path="/PaymentCollectionInfo/CCAvenuePaymentRequestHistory/"+cardNo+"/"+date;
  
   
    const response=await getData(path);
      if(response!==null){
        let keyArray=Object.keys(response);
         newKey= Math.max(...keyArray)+1;
      }
      let dataObj={
        merchantTransactionId:cardNo+generateRandomString(4),
        monthYear:monthYear.toString(),
        transactionAmount:amount,
        transactionDateTime:dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    await saveData(path+"/"+newKey,dataObj)
    
    
  }