import moment from 'moment';

export function formatDate(date) {
    const newDate = moment(date).format('MM/DD/YYYY')
    return newDate
  }
  
  export function valueFormatDate(date) {
    const newDate = moment(date).format('YYYY-MM-DD')
    return newDate;
  }