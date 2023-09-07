import { RemoveData, getData, saveData } from "./dbService";
import dayjs from "dayjs";

export const getCCAvenuePaymentRequestHistory=async() => {
    return new Promise((resolve) => {
          const path=localStorage.getItem('removePath');
          getData(path).then((response) => {
            let list=[]
            if(response!==null){
             resolve (response)
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
export const saveCCAvenuePaymentTransactionHistory=async(data)=>{
    const cardNo=localStorage.getItem('cardNo');
    const date=data.transactionDateTime.split(' ')[0];
    const year=dayjs(date).format('YYYY');
    const month=dayjs(date).format('MMMM');
    let path="PaymentCollectionInfo/PaymentTransactionHistory/"+cardNo+"/"+year+"/"+month+"/"+date+"/";
    let newKey=1;
    const resp=await getData(path);
    if(resp!=null){
        let keyArray=Object.keys(resp);
        newKey = Math.max(...keyArray)+1;
    }
    data.cardType=localStorage.getItem('cardType');
    data.payMethod='CC Avenue Payment'
    await saveData(path+newKey,data);
}
export const savePaymentCollectionHistory=async(yearMonth)=>{

   let list=yearMonth.split(',');
   const cardNo=localStorage.getItem('cardNo')
   list.map(item=>{
    const year=item.split('-')[1];
    const month=item.split('-')[0];
    const path="PaymentCollectionInfo/PaymentCollectionHistory/"+cardNo+"/"+year+"/"+month;
    saveData(path,{status:'Paid'});
   })
}
export const saveCCAvenuePaymentCollectorHistory=async(data) => {
        const date=data.transactionDateTime.split(' ')[0];
        const id=data.paymentCollectionById;
        const path="PaymentCollectionInfo/PaymentCollectorHistory/"+id+"/"+date+"/";
        let newKey=1;
        const resp=await getData(path);
        if(resp!=null){
            let keyArray=Object.keys(resp);
            newKey = Math.max(...keyArray)+1;
        }
        let obj={
            cardNo:localStorage.getItem('cardNo'),
            merchantTransactionId:data.merchantTransactionId,
            payMethod:'CC Avenue Payment',
            transactionAmount:data.transactionAmount
        }
        await saveData(path+newKey,obj);
}

export const deleteCCAvenuePaymentRequestHistory=async()=>{
    RemoveData(localStorage.getItem('removePath'));
 }
