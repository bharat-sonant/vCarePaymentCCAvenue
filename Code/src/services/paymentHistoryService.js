import dayjs from "dayjs";
import { getData, saveData } from "./dbService";
import { generateRandomString } from "./commonService";


export const getPaymentCollectionHistory=() => {
    return new Promise((resolve) => {
    const cardNo=localStorage.getItem('cardNo')
      const path="PaymentCollectionInfo/PaymentCollectionHistory/"+cardNo;
      getData(path).then(async(response) => {
        let list=[]
        if(response!==null){
          const currentMonth = dayjs();
          const startMonth = dayjs('2022-11-01'); 
          let referenceYearMonthArray=[];
          let currentDate = startMonth;

          while (currentDate.isBefore(currentMonth.endOf('month'))) {
            const year = currentDate.format('YYYY');
            const monthName = currentDate.format('MMM');
            referenceYearMonthArray.push(year+"/"+monthName)
            currentDate = currentDate.add(1, 'month');
          }

            const yearArray=Object.keys(response);
            yearArray.forEach(year => {
               if(Number(year)){
                const monthArray=Object.keys(response[year]);
                monthArray.forEach(month=>{
                   const timeStamp=dayjs(`${year}-${month}`).valueOf();
                    let resp=response[year][month];
                    list.push({year:year,month:month,amount:resp.amount,status:resp.status,timeStamp:timeStamp});
                    referenceYearMonthArray=referenceYearMonthArray.filter(item=>item!==year+"/"+month)
                })
               }
            });
            referenceYearMonthArray.map(async(yearMonth)=>{
              const year=yearMonth.split('/')[0];
              const month=yearMonth.split('/')[1];
              let obj={amount:list[0].amount,status:'Pending'}
              saveData("PaymentCollectionInfo/PaymentCollectionHistory/"+cardNo+"/"+yearMonth,obj);
              const timeStamp=dayjs(`${year}-${month}`).valueOf();
              list.push({year:year,month:month,amount:list[0].amount,status:'Pending',timeStamp:timeStamp});
            });
            
            list=list.sort((a,b)=>a.timeStamp>b.timeStamp?1:-1);
            resolve(list);
            
        }
        else{
            const amount=await getData("Settings/PaymentCollectionSettings/EntityType/"+localStorage.getItem('houseTypeId')+"/amount");
            const currentMonth = dayjs();
            const startMonth = dayjs('2022-11-01'); 
          
            let currentDate = startMonth;
            while (currentDate.isBefore(currentMonth.endOf('month'))) {
              const year = currentDate.format('YYYY');
              const monthName = currentDate.format('MMM');
              let obj={amount:amount,status:'Pending'}
              await saveData("PaymentCollectionInfo/PaymentCollectionHistory/"+cardNo+"/"+year+"/"+monthName,obj);
              const timeStamp=dayjs(`${year}-${monthName}`).valueOf();
              list.push({year:year,month:monthName,amount:amount,status:'Pending',timeStamp:timeStamp});
              currentDate = currentDate.add(1, 'month');
            }
            list=list.sort((a,b)=>a.timeStamp>b.timeStamp?1:-1)
            resolve (list)
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
    let path="/PaymentCollectionInfo/PaymentRequestHistory/"+cardNo+"/"+date;
    const response=await getData(path);
      if(response!==null){
        let keyArray=Object.keys(response);
         newKey= Math.max(...keyArray)+1;
      }
      const merchantTransactionId=cardNo+generateRandomString(4);
      let dataObj={
        merchantTransactionId:merchantTransactionId,
        monthYear:monthYear.toString(),
        transactionAmount:amount,
        transactionDateTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
        paymentCollectionById:'100',
        paymentCollectionByName:'Self'
      }
      
    await saveData(path+"/"+newKey,dataObj);
    localStorage.setItem('removePath',path+"/"+newKey);
    localStorage.setItem('transactionId',merchantTransactionId);
    localStorage.setItem('transactionAmount',amount)
    
    
  }
  
