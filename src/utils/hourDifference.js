module.exports = (lastMilestone) => {
    let date1 = new Date(lastMilestone)
    let date2 = new Date();

    //Difference in hours
    return parseInt((date2 - date1) / (1000 * 60 * 60));
}