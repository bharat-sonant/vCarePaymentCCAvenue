import React,{useEffect, useState} from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

 const DatePickerNew=(prop)=> {
  const [date,setDate]=useState(dayjs().format('YYYY-MM-DD'))
  useEffect(() => {
   }, []);
   function handleChange(e){
    setDate(e.format('YYYY-MM-DD'));
    prop.handleDateChange(e.format('YYYY-MM-DD'))
   }
   
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DatePicker onChange={(e)=>handleChange(e)} defaultValue={dayjs()} format='DD-MM-YYYY' className='manage-ward-coverage-dp' maxDate={prop.maxDate} />
    </LocalizationProvider>
  );
}
export default DatePickerNew