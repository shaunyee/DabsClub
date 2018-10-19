import moment from 'moment';

export function formatDate(date) {
    const newDate = moment(date).format('MM/DD/YYYY')
    return newDate
  }
  