const fs = require("fs");
const fetch = require("node-fetch");

const config = require("./config/config.js");

const localDB = require("./utils/db.json");
const tweet = require("./utils/tweet");
const abbreviateNumber = require("./utils/abbreviateNumber")
const calculatePercentage = require("./utils/percentage")
const hourDifference = require("./utils/hourDifference")
const convertFrom24To12Format = require("./utils/convertTime")


//Sloppy coding, cool be coded better than this
var milestones = [
    10000000,
    20000000,
    30000000,
    40000000,
    50000000,
    60000000,
    70000000,
    80000000,
    90000000,
    100000000
]

async function getData() {

    //Fetch data about MrBeast from YouTube's API
    const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCX6OQ3DkcsbYNE6H8uQQuVA&key=${config.yt_api_key}`).then(res => res.json());

    //We want it to be integer and not string
    let subCount = parseInt(data.items[0].statistics.subscriberCount);

    //Don't do anything if sub count is the same
    if (subCount == localDB.subscriberCount) return;

    //Current time in MS
    let currentTimeInMS = new Date().getTime()

    //Calculate % remaining
    let subCountPercentage = 100 - calculatePercentage(subCount, 100_000_000)

    let date = new Date();

    let day = date.getDate();
    let month = date.toLocaleString('default', { month: 'long' })
    let year = date.getFullYear();

    let hour = date.getHours();
    let minute = date.getMinutes();

    let timeAMPM = convertFrom24To12Format(`${hour}:${minute}`)

    let formattedDate = `${day} ${month} ${year} at ${timeAMPM} CET`

    var status;

    //Tweet MrBeast if milestone is reached (sloppy way of checking it but oh well, it has to do it for now)
    if (milestones.includes(subCount)) status = `On ${formattedDate} @MrBeast hit ${abbreviateNumber(subCount)} subscribers on YouTube! Congratulations!\n\n${subCountPercentage}% remains to 100M.`
    else status = `MrBeast just hit ${abbreviateNumber(subCount)} subscribers on YouTube! It took him around ${hourDifference(localDB.milestoneTimestamp)} hours to hit it.\n\n${subCountPercentage}% remains to 100M.`

    await tweet(status)
    
    //Make changes to Local Database
    localDB.subscriberCount = subCount;
    localDB.milestoneTimestamp = currentTimeInMS;

    //Save all changes we just made
    return fs.writeFileSync('./utils/db.json', JSON.stringify(localDB, null, 2));

}

//Do the same task every 1 minute (INCREASE IT IF YOU'RE RUNNING OUT OF YOUTUBE QUOTA!!!)
setInterval(() => {
    getData();
}, 1 * 60 * 1000)