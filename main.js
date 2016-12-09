$(document).ready(function() {
    // an interval sets up a function to run 10 times a second
    // so it's constantly checking the time of the movie and
    // using that time to decide which subtitle to display.
    setInterval(printTime, 100);
});

// Access the current timestamp of the movie
// and display it on the page.
function printTime() {
    var movie = $("video")[0];
    var time = movie.currentTime;
    $("#time").text(time);
    // console.log((time));
    displaySubtitle(time);
}
// pass the current time to the displaySubtitle function

// This function should accept time as a paramter
// and update the DOM to make the proper subtitle appear over the movie.
function displaySubtitle(time) {
    subtitleOnScreen = findSubtitle(time);
    $('#line1').text(subtitleOnScreen.line1);
    $('#line1').text(subtitleOnScreen.line2);
}

// This function should take time as a parameter and
// search through a list of subtitles to find and return the
// one subtitle that should be displayed.
// If no subtitle should be shown, then this function
// should return a dummy subtitle object that looks like:
// {line1: "", line2: ""} with two empty strings
// so the function looks like it's returning an
// empty subtitle (and not null) and it won't crash our
// program.
function findSubtitle(time) {
    for (var i = 0; i < SUBTITLES.length; i++); {
        if (isTimeInDuration(time, SUBTITLES[i])) {
            return SUBTITLES[i];
        } else {
            blankSubtitle = {
                line1: "",
                line2: ""
            };
        }
    }
    return blankSubtitle;
}

// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
function isTimeInDuration(time, subtitleObj) {
    // time = timeStampToSeconds(time);
    // var duration = subtitle.duration;
    // console.log(time);
    var durationMS0Trial = subtitleObj.duration.split(' --> ')[0];
    // console.log(durationMS0); //'00:00:16,520'
    var durationMS1Trial = subtitleObj.duration.split(' --> ')[1];
    // console.log(durationMS0); //''00:00:21,210''
    subtiteleStartTime = timestampToSeconds(durationMS0Trial);
    subtiteleEndTime = timestampToSeconds(durationMS1Trial);
    if (time >= subtiteleStartTime && time <= subtiteleEndTime) {
        return true;
    } else {
        return false;
    }
}
// console.log(isTimeInDuration("00:00:00,380", SUBTITLES[0]));

//     // THE LONGGGGG WAY!!!!!!!!!!!!!!!!!!!
//     var durationMS0 = parseInt(durationMS0Trial.split(',')[1], 10);
//     // console.log(durationMS0); // 520
//     var durationMS1 = parseInt(durationMS1Trial.split(',')[1], 10);
//     // console.log(durationMS0); // 210
//     var hms0 = durationMS0Trial.split(',')[0];
//     //  00:00:16
//     var hms1 = durationMS1Trial.split(',')[0];
//     // 00:00:21
//     var seconds0Decimals00 = hms0.split(':')[2];
//     var seconds0Decimals01 = hms1.split(':')[2];
//     // 16 and 21
//     var hours0 = hms0.split(':')[0];
//     var hours1 = hms1.split(':')[0];
//     var minutes0 = hms0.split(':')[1];
//     var minutes1 = hms1.split(':')[1];
//     var seconds0 = (seconds0Decimals00 + "." + ms);
//     var seconds1 = (seconds0Decimals01 + "." + ms);
//     var totalTime0 = (hours0 + minutes0 + seconds0);
//     var totalTime1 = (hours1 + minutes1 + seconds1);
//     console.log(time, totalTime0, totalTime1);
//     return (time >= totalTime0 && time <= totalTime1);
// }

// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
function timestampToSeconds(timestamp) {
    var ms = parseInt(timestamp.split(',')[1], 10);
    // console.log(ms); //580
    var hms = parseInt(timestamp.split(',')[0], 10);
    // console.log(hms); // 00:00:05
    var seconds = parseInt(hms.split(':')[2], 10);
    // console.log(seconds); //05
    var hours = hms.split(':')[0];
    var minutes = hms.split(':')[1];
    // console.log(seconds);
    var totalTimeInSeconds = (hours * 3600) + (minutes * 60) + seconds + (ms / 1000);
    return (totalTimeInSeconds);
}

console.log(timestampToSeconds("00:00:05,580"));
//
// // This is a test to see if the findSubtitle function returns the correct
// // subtitle for the movie at 82 seconds into the film. The correct subtitle
// // is
// // { duration: "00:01:21,540 --> 00:01:25,180",
// //   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
// console.log(findSubtitle(82));
