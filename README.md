#Subtitles
Solution for creating a site that shows subtitles over a movie. The
subtitles are based off of the .srt subtitle format. The subtitles
have been converted to JavaScript objects.

## What's Given
This starting code contains HTML that's all set up with a place for
two lines of subtitles to appear, and a small place to display the
current time of the movie. The movie is set up to play automatically.

The JavaScript contains function definitions for all the functions you
will need to complete this assignment. Every function definition is empty
besides having a name, a parameter and a comment describing what the function
should do. It's up to you to implement each actual function.

The functions are there as a guide.  You are allowed to add or remove however
many functions you wish. The function definitions as they are are literally the
same as all the functions in our solution code.

## The Basic Idea
We're trying to show subtitles over a movie. The subtitles are represented in
an array of objects. Each object has a 'duration' property that shows what
time the subtitle should appear, and when it should disappear. Each object
has exactly two lines of text. Sometimes one of the lines is empty text.

Your application should use an interval to constantly rapidly check the current
play time of the movie. You should use the infrastructure of the functions
provided to loop through the list of subtitles and compare them each to the
current play time of the movie. If a subtitle should be showing, then get
those strings in the subtitle objects onto your page!!

That's it. When you're done you should see that you can seek through the
movie and the subtitles will display correctly because they're based only
off the current time of the movie. Notice that the one iterval provided
does not try to set timeouts for each subtitle. Instead it just constantly
reads the current time of the movie and it uses that time to determine
what subtitle should be shown.

## File Formats
The original .srt format isn't in JavaScript. The instructional team has
converted the .srt file to JavaScript for you.

If you're curious, you can read more about the original file format here:
https://en.wikipedia.org/wiki/SubRip#SubRip_text_file_format

### Original .srt Format
```
0
00:00:36,830 --> 00:00:39,430
Act as normal and calm
as you can.

0
00:00:40,470 --> 00:00:42,550
I'll see if
he has time for you.

```

### Translated JavaScript Objects
```js
var SUBTITLES = [
  {
    duration: "00:00:36,830 --> 00:00:39,430",
    line1: "Act as normal and calm",
    line2: "as you can.",
  },
  {
    duration: "00:00:40,470 --> 00:00:42,550",
    line1: "I'll see if",
    line2: "he has time for you.",
  }
];
```

## Parsing Strings into Numbers
You'll need to use JavaScript String methods and number parsing
to manipulate timestamps into their hour, minute, second, milliseconds
components.

Here's a good way to tease numbers out of a string:
<https://repl.it/ElF6/2>

```js
var groceryString = "Bananas: $14.99,Apples: $12.22,Oranges: $0.25"

// use .split() to create an array splitting the original string up by commas.
var items = groceryString.split(",");

// just look at the banana description for now.
var banana = items[0];

// split the banana description into two halfs, and grab what's to
// the right of the dollar sign.
var price = banana.split("$")[1];

// chop the price string in half across the decimal.
// dollars end up at the first index.
// cents end up at the second index.
var dollars = price.split(".")[0];
var cents = price.split(".")[1];

// dollars and cents are still strings.
// Use the parseInt(str, 10) command to convert them into base-10 actual numbers.
dollars = parseInt(dollars, 10);
cents = parseInt(cents, 10);

// it's a good idea to convert different units into one unit.
// it makes things easier to compare.
var totalCents = cents + 100*dollars;

console.log(totalCents);
```

Read more about the original file format here:
<https://en.wikipedia.org/wiki/SubRip#SubRip_text_file_format>


## Licensing
All content is licensed under a CC­BY­NC­SA 4.0 license.
All software code is licensed under GNU GPLv3. For commercial use or alternative licensing, please contact legal@ga.co.

