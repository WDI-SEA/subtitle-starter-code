$(document).ready(function() {
  // an interval sets up a function to run 10 times a second
  // so it's constantly checking the time of the movie and
  // using that time to decide which subtitle to display.
  setInterval(printTime, 50);
});

// Access the current timestamp of the movie
// and display it on the page.
function printTime() {
  var movie = $("video")[0];
  var time = movie.currentTime;
  $("#time").text(time);

  // pass the current time to the displaySubtitle function
  displaySubtitle(time);
}

function hashmapSubtitles(sub) {
  // takes the SUBTITLES.js stuff and reformats it as
  // { timeStart: [timeEnd, line1, line2] }
  var hashedSub = {};
  var duration = [];
  var key;
  // for my reference: SUBTITLE[i].duration, .line1, .line2
  // SUBTITLES[2].duration = "00:00:09,230 --> 00:00:14,440"
  for (var i=0; i<sub.length; i++) {
    duration = sub[i].duration.split(" --> ");
    key = Math.round(timestampToSeconds(duration[0])*10)/10;
    hashedSub[key] = sub[i];
  }
  return hashedSub;
}

var HASHEDSUBS = hashmapSubtitles(SUBTITLES);

// This function should accept time as a paramter
// and update the DOM to make the proper subtitle appear over the movie.
function displaySubtitle(time) {
  var roundedTime = Math.round(time*10)/10;
  console.log(time);
  if (HASHEDSUBS.hasOwnProperty(roundedTime)){
    $("#line1").text(HASHEDSUBS[roundedTime].line1);
    $("#line2").text(HASHEDSUBS[roundedTime].line2);
    setTimeout(function() {
      $("#line1").text("");
      $("#line2").text("");
    }, ((timestampToSeconds(HASHEDSUBS[roundedTime].duration.split(" --> ")[1])-time)*1000) ) // clear text, timeout in milliseconds
  };
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

}

// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
function isTimeInDuration(time, subtitle) {

}

// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
function timestampToSeconds(timestamp) {
  // replace comma because psh, commas are for other countries
  // split string by ":" to get an array of hours, minutes, and milliseconds
  // chain those methods together because I gosh darn can dangnabbit
  var h_m_ms = timestamp.replace(",", ".").split(":");
  // .toFixed(3) is for keeping that thousandth place
  return (parseFloat(h_m_ms[0])*3600 + parseFloat(h_m_ms[1])*60 + parseFloat(h_m_ms[2])).toFixed(3);
}

// This is a test to see if the findSubtitle function returns the correct
// subtitle for the movie at 82 seconds into the film. The correct subtitle
// is
// { duration: "00:01:21,540 --> 00:01:25,180",
//   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
console.log(findSubtitle(82));
