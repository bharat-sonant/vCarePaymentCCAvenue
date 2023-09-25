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
export const saveCCAvenuePaymentTransactionHistory=async(data,params)=>{
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
    let dateFormate =params.trans_date.split(" ")[0];
    dateFormate=dateFormate.split("/")[2]+"-"+dateFormate.split("/")[1]+"-"+dateFormate.split("/")[0]
    const transactionDate=dateFormate+" "+params.trans_date.split(" ")[1];

    data.cardType=localStorage.getItem('cardType');
    data.payMethod='CC Avenue Payment'
    data.retrievalReferenceNo=params.bank_ref_no;
    data.trackingId=params.tracking_id;
    data.transactionDateTime=transactionDate

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
export const saveCCAvenuePaymentCollectorHistory=async(data,params) => {
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
            transactionAmount:data.transactionAmount,
            retrievalReferenceNo:params.bank_ref_no
            
        }
        await saveData(path+newKey,obj);
}
export const deleteCCAvenuePaymentRequestHistory=async()=>{
    RemoveData(localStorage.getItem('removePath'));
 }
