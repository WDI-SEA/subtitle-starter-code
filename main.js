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
    var SubTitle1;
    var SubTitle2;
    for(var i = 0; i < SUBTITLES.length; i++) {
      console.log(SUBTITLES[i].line1);
      console.log(SUBTITLES[i].line2);
      if(isTimeInDuration === true) {
        subTitle1 = SUBTITLES[i].line1;
        console.log(subTitle1);
        subTitle2 = SUBTITLES[i].line2;
        console.log(subTitle2);
      }
      else {
        return {line1: "", line2: ""};
      }
    }
  }

// This function should accept a current time, and one subtitle
// object and return true or false depending on if the subtitle
// should appear on the screen at the given time.
  function isTimeInDuration(time, subtitle) {
    time = timestampToSeconds(time);
    var duration = subtitle.duration
    console.log(duration);
    var startTime = timestampToSeconds(subtitle.duration.split(" --> ")[0]);
    console.log(startTime);
    var endTime = timestampToSeconds(subtitle.duration.split(" --> ")[1]);
    console.log(endTime);
    return startTime <= time && time <= endTime;
  }
  console.log(isTimeInDuration("00:00:00,380", SUBTITLES[0]));



// This function should accept a timestamp string and turn it into
// a number that can be used elsewhere. For instance,
// timestampToSeconds("00:00:05,580") should return 5.580
  function timestampToSeconds(timestamp) {
    var ms = parseInt(timestamp.split(",")[1], 10);
    var remainingUnits = timestamp.split(",")[0].split(":");
    var sec = parseInt(remainingUnits[2], 10);
    var min = parseInt(remainingUnits[1], 10);
    var hour = parseInt(remainingUnits[0], 10);
    var totalTime = (ms/1000)+sec+(min*60)+(hour*3600);
    return totalTime;
  }

// This is a test to see if the findSubtitle function returns the correct
// subtitle for the movie at 82 seconds into the film. The correct subtitle
// is
// { duration: "00:01:21,540 --> 00:01:25,180",
//   line1: "Can I ask your name?", line2: "-Margarethe Lorenz." }
console.log(findSubtitle(82));
