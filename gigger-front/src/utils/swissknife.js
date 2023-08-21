export const secondsToHMS = (seconds) => {
    const extraZero = '0'
    const minutes = Math.floor(seconds/60)    
    const secondsFinal = seconds - minutes*60
    
    const hours = Math.floor(minutes/60)
    const minutesFinal = minutes - hours*60
    return `${hours}:${minutesFinal<10?'0'+minutesFinal:minutesFinal}:${secondsFinal<10?'0'+secondsFinal:secondsFinal}`
}