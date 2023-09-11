
import {toast} from 'react-toastify';
import '../assets/css/alert.css'
import * as XLSX from 'xlsx/xlsx.mjs';

export const getDate=() => {
  return new Promise((resolve) => {
    let d=new Date();
    let month=d.getMonth()+1;
    let day=d.getDate();
    resolve(d.getFullYear()+"-"+(month<10? "0":"")+month+"-"+(day<10? "0":"")+day);

  });
}

export const getDateTime=() => {
  return new Promise((resolve) => {
    let d=new Date();
    let month=d.getMonth()+1;
    let day=d.getDate();
    let hour=d.getHours();
    let min=d.getMinutes();
    resolve(d.getFullYear()+"-"+(month<10? "0":"")+month+"-"+(day<10? "0":"")+day+" "+(hour<10? "0":"")+hour+":"+(min<10? "0":"")+min);

  });
}

export const getDateFormat=(date) => {
  return new Promise((resolve) => {
    getMonthName(Number(date.split('-')[1])).then((monthName) => {
      return date.split('-')[2]+" "+monthName+" "+date.split('-')[0];
    });
  });
}

export const getDateTimeFormat=(date) => {
  return new Promise((resolve) => {
    let time=date.split(" ")[1];
    let newDate=date.split(" ")[0];
    let month=newDate.split("-")[1];
    let year=newDate.split("-")[0];
    let day=newDate.split("-")[2];    
    resolve(getMonthShortName(Number(month)).then((monthName) => {
      return day + " " + monthName + " " + year + " " + time;
    }));
  });
}
export const getAllmonthsNaame= ()=>{
  let month = [];
  month[1]="January";
    month[2]="February";
    month[3]="March";
    month[4]="April";
    month[5]="May";
    month[6]="June";
    month[7]="July";
    month[8]="August";
    month[9]="September";
    month[10]="October";
    month[11]="November";
    month[12]="December";
  return(
    month
  )
}
export const exportExcel = (htmlString, fileName) => {
  var parser = new DOMParser();
  var doc = parser.parseFromString(htmlString, 'text/html');
  const ws = XLSX.utils.table_to_sheet(doc);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  XLSX.writeFile(wb, fileName);
}

export const getAllYear = () => {
  const currentYear = new Date().getFullYear() -2;
  const numOfYears = 3;
  const years = [];

  for (let i = 0; i < numOfYears; i++) {
    const year = currentYear + i;
    years.push(year.toString());
  }

  return years;
};


export const getMonthName=(monthNumber) => {
  return new Promise((resolve) => {
    var d=new Date();
    var month=new Array();
    month[1]="January";
    month[2]="February";
    month[3]="March";
    month[4]="April";
    month[5]="May";
    month[6]="June";
    month[7]="July";
    month[8]="August";
    month[9]="September";
    month[10]="October";
    month[11]="November";
    month[12]="December";
    if(monthNumber!=undefined) {
      resolve(month[monthNumber]);
    } else {
      resolve(month[d.getMonth()]);
    }

  });
}

export const getMonthShortName=(monthNumber) => {
  return new Promise((resolve) => {
    var d=new Date();
    var month=new Array();
    month[1]="Jan";
    month[2]="Feb";
    month[3]="Mar";
    month[4]="Apr";
    month[5]="May";
    month[6]="Jun";
    month[7]="Jul";
    month[8]="Aug";
    month[9]="Sep";
    month[10]="Oct";
    month[11]="Nov";
    month[12]="Dec";
    if(monthNumber!=undefined) {
      resolve(month[monthNumber]);
    } else {
      resolve(month[d.getMonth()]);
    }

  });
}

export const getDayName=() => {
  return new Promise((resolve) => {
    let day=new Date().getDay();
    let dayName="";
    if(day==0) {
      dayName="Sunday";
    }
    else if(day==1) {
      dayName="Monday";
    }
    else if(day==2) {
      dayName="Tuesday";
    }
    else if(day==3) {
      dayName="Wednesday";
    }
    else if(day==4) {
      dayName="Thursday";
    }
    else if(day==5) {
      dayName="Friday";
    }
    else if(day==6) {
      dayName="Saturday";
    }
    resolve(dayName);

  });
}

export const setAlertMessage=(type, message)=> {
  if (type == "error") {
    toast.error(message,{
      position: 'bottom-right',
      
  });
  } else {
    toast.success(message,{
      position: 'bottom-right',
      toastStyle: {
        background: '#ffa500',
        color: 'white',
        width: '800px',
      },
  });
  }
}
export function getTodayDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const date = `${yyyy}-${mm}-${dd}`;
  return date;
}
export function showAlert(message, type) {


  if (type == 'error') {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container'
    alertContainer.innerHTML = message

    document.body.appendChild(alertContainer);

    setTimeout(function () {
      alertContainer.classList.add("show");
    }, 100);
    setTimeout(function () {
      alertContainer.remove();
    }, 3000);
  }
  else {

    const successContainer = document.createElement('div');
    successContainer.className = 'success-container'
    successContainer.innerHTML = message

    document.body.appendChild(successContainer);

    setTimeout(function () {
      successContainer.classList.add("show");
    }, 100);
    setTimeout(function () {
      successContainer.remove();
    }, 3000);
  }

  

}  

export function getTodayDatewithTime() {
  // Create a new Date object with the current date and time
  var currentDate = new Date();

  // Format the date and time
  var year = currentDate.getFullYear();
  var month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as months are zero-indexed
  var day = currentDate.getDate().toString().padStart(2, '0');
  var hours = currentDate.getHours().toString().padStart(2, '0');
  var minutes = currentDate.getMinutes().toString().padStart(2, '0');

  var pickedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return pickedDate;

}
export function excelDateToJSDate (serialDate)  {
  const utcDays = Math.floor(serialDate - 25569); // Adjust for Excel's date base (January 0, 1900)
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const jsBaseDateMilliseconds = new Date(0).getTime();
  const dateMilliseconds = utcDays * millisecondsPerDay + jsBaseDateMilliseconds;
  const date = new Date(dateMilliseconds);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const getColor=(index)=>{
  let color="black";
  if(index==0){
    color="blue";
  }
  else if(index==1){
    color="orange";
  }
  else if(index==2){
    color="#36454F";
  }
  else if(index==3){
    color="#301934";
  }
  else if(index==4){
    color="#3D0C02";
  }
  return color;
}

export const getStoragePath=()=>{ 
    return "https://firebasestorage.googleapis.com/v0/b/dtdnavigator.appspot.com/o/Jaipur-Malviyanagar%2F"
}

export const getDistanceFromLatLonInKm=(lat1, lon1, lat2, lon2)=> {
  const R = 6377830; // metres
  const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in metres
}

export const generateRandomString=(length)=>{
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
export function showAlertMobile(message, type) {


  if (type == 'error') {
    const alertContainer = document.createElement('div');
    alertContainer.className = 'alert-container-mobile'
    alertContainer.innerHTML = message

    document.body.appendChild(alertContainer);

    setTimeout(function () {
      alertContainer.classList.add("show");
    }, 100);
    setTimeout(function () {
      alertContainer.remove();
    }, 3000);
  }
  else {

    const successContainer = document.createElement('div');
    successContainer.className = 'success-container-mobile'
    successContainer.innerHTML = message

    document.body.appendChild(successContainer);

    setTimeout(function () {
      successContainer.classList.add("show");
    }, 100);
    setTimeout(function () {
      successContainer.remove();
    }, 3000);
  }

  

} 