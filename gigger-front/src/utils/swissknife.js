export const secondsToHMS = (seconds) => {
    const extraZero = '0'
    const minutes = Math.floor(seconds/60)    
    const secondsFinal = seconds - minutes*60
    
    const hours = Math.floor(minutes/60)
    const minutesFinal = minutes - hours*60
    return `${hours}:${minutesFinal<10?'0'+minutesFinal:minutesFinal}:${secondsFinal<10?'0'+secondsFinal:secondsFinal}`
}
export const secondsToMS = (seconds) => {
    const extraZero = '0'
    const minutes = Math.floor(seconds/60)    
    const secondsFinal = seconds - minutes*60

    const minutesFinal = minutes 
    return `${minutesFinal<10?'0'+minutesFinal:minutesFinal}:${secondsFinal<10?'0'+secondsFinal:secondsFinal}`
}

export const dateToDDMMYYYYHHMM = (date) => {
    const dateToConvert = new Date(date)
    const yyyy = dateToConvert.getFullYear()
    const mm = (dateToConvert.getMonth() + 1) < 10 ? `0${dateToConvert.getMonth() + 1}` : dateToConvert.getMonth() + 1
    const dd = (dateToConvert.getDate()) < 10 ? `0${dateToConvert.getDate()}` : dateToConvert.getDate()

    const hh = (dateToConvert.getUTCHours()+2) < 10 ? `0${dateToConvert.getUTCHours()+2}` : dateToConvert.getUTCHours()+2
    const min = (dateToConvert.getMinutes()) < 10 ?  `0${dateToConvert.getMinutes()}` : dateToConvert.getMinutes()
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`
d
}