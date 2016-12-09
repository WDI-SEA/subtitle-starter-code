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


// This function should accept time as a paramter
// and update the DOM to make the proper subtitle appear over the movie.
function displaySubtitle(time) {
  var roundedTime = Math.round(time*10)/10;
  console.log(time);
  if (HASHEDSUBS.hasOwnProperty(roundedTime)){
    $("#line1").text(HASHEDSUBS[roundedTime][1]);
    $("#line2").text(HASHEDSUBS[roundedTime][2]);

    var clearLines = setTimeout(function() {
      $("#line1").text("");
      $("#line2").text("");
    }, ((HASHEDSUBS[time][0]-time)*1000) ) // clear text, timeout in milliseconds
  };
}

// iterate through each object in SUBTITLES
// moving to the next only when time moves outside of duration
function currentSubtitle(subtitle, index, time) {
  var duration = subtitle[index].duration.split(" --> ");
  if (time >= duration[0] && time < duration[1]) {
    return true;
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
  // remove comma because psh, commas are for other countries
  // split string by ":" to get an array of hours, minutes, and milliseconds
  // chain those methods together because I gosh darn can dangnabbit
  var h_m_ms = timestamp.replace(",", "").split(":");
  // .toFixed(3) is for keeping that thousandth place
  return (parseInt(h_m_ms[0])*3600 + parseInt(h_m_ms[1])*60 + parseInt(h_m_ms[2])/1000).toFixed(3);
}

// This is a test to see if the findSubtitle function returns the correct
// subtitle for the movie at 82 seconds into the film. The correct subtitle
// is
// { duration: "00:01:21,540 --> 00:01:25,180",
//   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
console.log(findSubtitle(82));