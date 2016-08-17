/* 
 * Cargo test task.
 * @author Borshchov Dimitriy <grimstal@bigmir.net> 
 */

/**
 * @param {string} string for parsing
 * @returns {String|Boolean}
 */
function getFormattedString(string) {
    function dayTimeSoreter(a, b) {
        if (a.day > b.day) {
            return 1;
        } else if (a.day < b.day) {
            return -1;
        } else {
            if (a.time > b.time) {
                return 1;
            } else if (a.time < b.time) {
                return -1;
            }
        }
        return 0;
    }

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function addCleanElement(obj) {
        cleanArr.push({
            day: obj.day,
            startTime: obj.time,
            endTime: obj.time
        });
    }

    function validateForObj(day, time) {
        if (day < 0 || time.length < 2) {
            return false;
        } else if (isNaN(time[0]) || time[0] > 23 || time[0] < 0) {
            return false;
        } else if (isNaN(time[1]) || time[1] < 0 ||
                time[1] > 59 || time[1] % step) {
            return false;
        }
        return true;
    }

    function getTimeString(obj) {
        function stringTime(ms) {
            var time = new Date(ms);
            return time.getHours() + ":" + (time.getMinutes() ? time.getMinutes() : "00");
        }

        if (obj.startTime === obj.endTime) {
            return stringTime(obj.startTime);
        } else {
            return stringTime(obj.startTime) + "-" + stringTime(obj.endTime);
        }
    }

    var initArr, objArr = [], cleanArr = [], resultArr = [];
    var week = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
    var step = 30;
    var stepTime = step * 60 * 1000;
    var currentDay;

    if (!string) {
        return false;
    }

    initArr = string.split(", ");

    initArr.forEach(function (value) {
        var element = value.split(": ");
        var day;
        var time;

        if (element.length < 2) {
            return false;
        }

        day = week.indexOf(element[0].toLowerCase());
        time = element[1].split(":");
        time[0] = Number(time[0]);
        time[1] = Number(time[1]);

        if (validateForObj(day, time)) {
            objArr.push({
                "day": day,
                "time": new Date(0, 0, 0, time[0], time[1]).getTime()
            });
        }
    });

    objArr.sort(dayTimeSoreter);

    objArr.forEach(function (obj) {
        var prevElement;

        if (obj.day !== currentDay) {
            currentDay = obj.day;
        } else {
            prevElement = cleanArr[cleanArr.length - 1];
            if (obj.time === prevElement.startTime) {
                return false;
            } else if ((obj.time - stepTime) === prevElement.endTime) {
                prevElement.endTime = obj.time;
                return false;
            }
        }
        addCleanElement(obj);
    });

    currentDay = undefined;

    cleanArr.forEach(function (obj) {
        if (currentDay !== obj.day) {
            currentDay = obj.day;
            resultArr.push(capitalize(week[obj.day]) + ": " + getTimeString(obj));
        } else {
            resultArr[resultArr.length - 1] += ", " + getTimeString(obj);
        }
    });
    
    return resultArr.join("; ") || false;
}

function startParsing() {
    var answerLabel = document.getElementById("answer");
    var input = document.getElementById("input-field");
    var result;
    
    answerLabel.innerHTML = "";
    result = getFormattedString(input.value);
    
    if (result) {
        answerLabel.innerHTML = result;
    }
}