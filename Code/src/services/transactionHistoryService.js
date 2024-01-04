import { getData } from "./dbService";

export const getCCAvenuePaymentTransactionHistory=(houseTypeId) => {
    return new Promise((resolve) => {
    const cardNo=localStorage.getItem('cardNo')
      let path;
      console.log(houseTypeId)
      if(houseTypeId === '19' || houseTypeId === '20'){
        path="PaymentCollectionInfo/PaymentTransactionHistory/"+cardNo+"/Entities/"+localStorage.getItem('entityId');
      }else{
        path="PaymentCollectionInfo/PaymentTransactionHistory/"+cardNo;
      }

      // const path="PaymentCollectionInfo/PaymentTransactionHistory/"+cardNo;
      getData(path).then((response) => {
        let list=[]
        if(response!==null){

            const yearArray=Object.keys(response);
          
            yearArray.forEach(year => {
               if(Number(year)){
                const monthArray=Object.keys(response[year]);
                monthArray.forEach(month=>{
                    const dateArray=Object.keys(response[year][month]);
                    dateArray.forEach(date=>{
                       const keyArray=Object.keys(response[year][month][date]);
                       keyArray.forEach(key=>{
                        if(Number(key)){
                            let resp=response[year][month][date][key];
                            list.push({key:key,orderId:resp.merchantTransactionId,transactionDate:date,transactionAmount:resp.transactionAmount,payMethod:resp.payMethod,collectorName:resp.paymentCollectionByName,paidMonth:resp.monthYear,status:'Paid',referenceId:resp.retrievalReferenceNo
                            });
                         }
                       })
                    });
                });
               }
            });
            // list=list.sort((a,b)=>a.timeStamp>b.timeStamp?1:-1;
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