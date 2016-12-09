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

  // pass the current time to the displaySubtitle function
  displaySubtitle(time);
}

// This function should accept time as a paramter
// and update the DOM to make the proper subtitle appear over the movie.
function displaySubtitle(time) {
lineToDisplay = findSubtitle(time);
// console.log(lineToDisplay);
$('#line1').text(lineToDisplay.line1);
$('#line2').text(lineToDisplay.line2);
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
    for(var i = 0; i < SUBTITLES.length; i++) {
      // console.log(SUBTITLES[i].line1);
      // console.log(SUBTITLES[i].line2);
      if(isTimeInDuration(time, SUBTITLES[i])) {
         return SUBTITLES[i];
      }
      else {
        dummyObject = {line1: "", line2: ""};
      }
    }
      return dummyObject;
  }




// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
function isTimeInDuration(time, subtitle) {
// time = timestampToSeconds(time);
var startTime = timestampToSeconds(subtitle.duration.split(' --> ')[0]);
var endTime = timestampToSeconds(subtitle.duration.split(' --> ')[1]);
  return startTime <= time && time <= endTime;
}


// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
function timestampToSeconds(timestamp) {

var ms = parseInt(timestamp.split(',')[1], [10])/1000;
var units = timestamp.split(',')[0].split(':');


var secs = parseInt(units[2], 10);
var minutes = parseInt(units[1], 10)*60;
var hours = parseInt(units[0], 10/60)*60;
var seconds = ms + secs + minutes + hours;
return seconds;
}
