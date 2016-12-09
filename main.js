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
  var subtitle = findSubtitle(time);
  if(subtitle !== false){
  $("#line1").text(SUBTITLES[subtitle].line1);
  $("#line2").text(SUBTITLES[subtitle].line2);
    } else {
      $("#line1").text("");
      $("#line2").text("");
      }
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
  for (var i = 0; i < SUBTITLES.length; i++){
      var subtitle = SUBTITLES[i];
      if (isTimeInDuration(time, subtitle)){//is this time in that subtitle duration?
          return i;//If yes return the subtitle
      } else {

      }
  }
  return false; //? not sure what it is?
}


// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
function isTimeInDuration(time, subtitle) {
  var startTime = timestampToSeconds(subtitle.duration.split(' --> ')[0]);
  var endTime = timestampToSeconds(subtitle.duration.split(' --> ')[1]);
  // var currentTime = time;//?

    if (time >= startTime && time <= endTime){
      return true;
    } else {

    }
}


// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
function timestampToSeconds(timestamp) {

  var units = timestamp.split(',')[0].split(':');

  var ms = parseInt(timestamp.split(',')[1],10)/1000;
  var secs = parseInt(units[2], 10);
  var minutes =  parseInt(units[1], 10)*60;
  var hours =  parseInt(units[0], 10/60 * 60);
  var seconds = ms + secs + minutes + hours;

  return seconds;
}

// console.log(timestampToSeconds("00:00:05,580"));

// This is a test to see if the findSubtitle function returns the correct
// subtitle for the movie at 82 seconds into the film. The correct subtitle
// is
// { duration: "00:01:21,540 --> 00:01:25,180",
//   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
// console.log(findSubtitle(82));
