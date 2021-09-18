module.exports = (lastMilestone) => {
    let date1 = new Date(lastMilestone)
    let date2 = new Date();

    let diff = date2 - date1

    var hours = (Math.floor(diff / 3.6e5)).toFixed(0);
    var minutes = (Math.floor(diff % 3.6e5) / 6e4).toFixed(0);
    var seconds = (Math.floor(diff % 6e4) / 1000).toFixed(0)

    //Difference in hours, minutes and seconds
    return `${hours} ${hours == 1 ? 'hour' : 'hours'}, ${minutes} ${minutes == 1 ? 'minute' : 'minutes'} and ${seconds} ${seconds == 1 ? 'second' : 'seconds'}`
}
