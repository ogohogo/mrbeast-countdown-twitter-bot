module.exports = (lastMilestone) => {
    let date1 = new Date(lastMilestone)
    let date2 = new Date();

    let diffMs = (date2 - date1)

    let hours = Math.floor((diffMs % 86400000) / 3600000); // hours
    let minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

    //Difference in hours, minutes and seconds
    return `${hours} hours and ${minutes} minutes`
}