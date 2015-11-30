# Countid
jQuery Plugin to count up and count down numbers or clock times

# Requirements:
Countid plugin requires the latest version of [jQuery](http://jquery.com/). Also you can include [waypoints plugin](https://github.com/imakewebthings/waypoints) to execute the counting after you scroll to the countid element

# Usage
jsFiddle example for [count up](https://jsfiddle.net/miso25/x89kLoqc/) and [count down](https://jsfiddle.net/miso25/4a4j0bgd/)

# Custom formatting
See [jsFiddle](https://jsfiddle.net/miso25/f3vu8pdh/) example to customize your number output 

# Clock timer
See [jsFiddle](https://jsfiddle.net/miso25/kLnkrzz4/) example to count down and count up clock 

# Options
A complete listing of the options that can be passed to the method is below.

Option | Data Attribute | Default | Description
----|------|----|----
start | data-start  | 0  | start
end | data-end  | 0  | end
speed | data-speed  | 10  | speed in fps - frames per seconds
tick | data-tick  | 10  | tick
clock | data-clock  | false  | clock
switchClock | data-switch-clock  | true  | switchClock
dateTime | data-date-time  | 1/1/1970 | Possible formats: You can set this value to absolute MM/DD/YYYY H:i:s or MM/DD/YYYY or relative MM/DD or H:i or H:i:s ; when relative value is set, counter is counting up or counting down to the provided value of the current year/day
