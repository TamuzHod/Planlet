
var schedules = [];
var currentScheduleIndex;
var classesObject = {};
var blockedTimes = [[],[],[],[],[]];

var colors = ["Chocolate", "Peru", "Sienna", "Goldenrod", "Brown", "Maroon", "pink", "orange", "violet", "Tomato", "DarkRed", "LightCoral"]
var classNameIndex = [];

$(window).on('beforeunload', function () {
    $.postJSON('/saveNotIndexed/schedules/' + $("#emailInput").text(), schedules, function (result) {
        console.log('result', result);
    });
});


$.postJSON = function (url, data, success, args) {
    args = $.extend({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: success
    }, args);
    return $.ajax(args);
};

var day = {
    monday: 0,
    tuesday: 1,
    wednesday: 2,
    thursday: 3,
    friday: 4,
}

function getDay(dayStr) {
    switch (dayStr) {
        case "M":
            return day.monday;
        case "T":
            return day.tuesday;
        case "W":
            return day.wednesday;
        case "Th":
            return day.thursday;
        case "F":
            return day.friday;
    }
}

var subset3 = [];
var subset4 = [];
var subset5 = [];
$(document).ready(function () {
    $.getJSON('/getSelectedClasses/' + $("#emailInput").text() + '/'+Math.random() , function (data) {
        blockedTimes = data.blockedTimes 
        var incomingSchdules = data.schedules;
        data = data.content.jsonData;
        var classes = data.classes;
        for(var i=0;i<classes.length;i++){
            classesObject[classes[i].id] = classes[i];
        }
         var link = '/classes/' + $("#emailInput").text() + "/" + data.majorName + '/' + data.minorName + '/' + data.collegeName;
        $("#backToClasses").attr("href", link);
        link = '/userInfo/' + $("#emailInput").text() + "/" + data.majorName + '/' + data.minorName + '/' + data.collegeName;
        $("#toSettings").attr("href", link);
       
        if(!incomingSchdules || incomingSchdules.length == 0){
            getSubsetsofSizeK(classes, 3, subset3);
            getSubsetsofSizeK(classes, 4, subset4);
            getSubsetsofSizeK(classes, 5, subset5);
            createSchedule(subset3, schedules);
            createSchedule(subset4, schedules);
            createSchedule(subset5, schedules);
        }
        else{
            schedules = incomingSchdules;
        }
        if(blockedTimes)
            weedOutBlockedTimes(schedules, blockedTimes);
        createHTML(schedules);
    });
});

function weedOutBlockedTimes(schedules, blockedTimes) {
    for(var i=0; i<schedules.length; i++){
        schedules[i].hide = cheackBlockedTimes(schedules[i])
    }
}

function cheackBlockedTimes(schedule){
    for(var currDay=0; currDay<schedule.events.length; currDay++){
        for (var j = 0; j < schedule.events[currDay].length; j++) {
            for(var k=0; k<blockedTimes[currDay].length; k++){
                var aStart = hrToMinutes(schedule.events[currDay][j].start)
                var bStart = hrToMinutes(blockedTimes[currDay][k][0])
                var aEnd = hrToMinutes(schedule.events[currDay][j].end)
                var bEnd = hrToMinutes(blockedTimes[currDay][k][1])
                if (aStart > bStart && aStart < bEnd || aEnd > bStart && aStart < bEnd){
                    return true;
                }
            }
        }
    }
    return false;
}

function danceLoop(i, j) {
    setTimeout(function () {
        $("#" + j++).effect("shake");
        if (--i) danceLoop(i, j);      //  decrement i and call myLoop again if i > 0
    }, 250)
}

"2019-02-18T10:00:00"
"2015-01-01T00:00:00"



function seeNewSchedule(scheduleHTML) {

        currentScheduleIndex = scheduleHTML.id;
        schedule = schedules[currentScheduleIndex];

        $('#possSchedules').hide();

        if (schedules[currentScheduleIndex].starred)
            $('#starButt').addClass('starred');
        else
            $('#starButt').removeClass('starred');

        var commitHeight = window.innerHeight * .85;
        $('#commSchedule').css("height", commitHeight + "px");
        createLargeSchedule(schedule);

        $('#commSchedule').show();

    }

    function createLargeSchedule(schedule) {
        var height = window.innerHeight;
        var html = "";
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        var daysAbbrev = ['M', 'T', 'W', 'Th', 'F'];
        var uniqueClasses = [];
        var commitheight = (height * .77) / 840;
        var yval = 0;
        html += '<div>';
        var index = 0;

        html += '<div style="width: 11%" class="largeCondDay">'
        for (var x = 8; x < 23; x++) {
            yval = 55+ (((x - 8) * 60)) * commitheight;
            html += '<p style="position: absolute; top:' + yval + 'px; font-size: 10px;">' + x + ':00</p>';
        }
        html += '</div>'

        html += '<div  style="align: right;"';

        $.each(schedule.events, function (index, dayEvents) {
            html += '\t<div class="largeCondDay  id="' + days[index] + '">\n';
            html += '\t\t<div style="position: absolute; top:30px; width: 15%;" class="dayTitle">' + daysAbbrev[index] + ' </div>\n';

            $.each(dayEvents, function (index, event) {
                var hour = parseInt(event.start.substring(0, 2));
                var minute = parseInt(event.start.substring(3, 5));
                yval = 60+(((hour - 8) * 60 + minute)) * commitheight;
                var ylength = event.length * commitheight;
                var courseIndex = classNameIndex.findIndex(id => id === event.id);
                var color;
                if (courseIndex >= 0) {
                    color = 'style="position: absolute; top:' + yval + 'px; height: ' + ylength + 'px;background-color:' + colors[courseIndex] + ';"';
                } else {
                    classNameIndex.push(event.id);
                    color = 'style="position: absolute; top:' + yval + '; background-color:' + colors[classNameIndex.length - 1] + ';"';
                }
		   /* var newid =' "'+event.id+'"';*/

                html += '\t\t\t<div ' + color + ' class="largeClass JPO_open" id="div'+event.id + '" onclick="callPopup(&quot;'+event.id+'&quot;)">' + event.id + '</div>\n';

            });
            html += '\t</div>\n';
            index++;

        });
        html += '</div></div>\n';

        var commitdiv = document.getElementById("upclosediv");
        commitdiv.innerHTML = html;
        /*console.log(commitdiv.innerHTML);*/
    }

    $(document).ready(function () {
        // Initialize the plugin
        $('#JPO').popup();

        // Set default `pagecontainer` for all popups (optional, but recommended for screen readers and iOS*)
        $.fn.popup.defaults.pagecontainer = '#page'
    });

    function callPopup(eventid){
	    var classObject = "";
    	for (var counter = 0; counter < this.schedule.classes.length; counter++){
		    if (schedule.classes[counter]  == eventid){
		    	classObject = classesObject[schedule.classes[counter]];
		    }
	    }
        var popup = document.getElementById("content");
        var newHTML = '';
        newHTML += '<center>\n<h5 style="margin-bottom: 0em;">'+classObject.id+'</h5><h4  style="margin-top: .2em; margin-bottom: 1em;">'+classObject.title+'\n</h4>\n</center>';
        newHTML+= '<p>\n	<h5>\n	<span id="unitspan"><span class="titlespan"><u>Units</u>:  </span>'+classObject.units+'</span><br> \n<span class="titlespan" id="timetitle"><br><u>Times</u>:  <span><br>';
        for (var i = 0; i < classObject.times.length; i++){
            newHTML+='<span class="timespan">'+classObject.times[i].day + ':  '+ classObject.times[i].start + ' - ' + classObject.times[i].end + '</span><br>';
        }
        newHTML+='<br>\n<span class="titlespan" id="profspan"><u>Professor</u>:  ' + classObject.prof +'<span><br>\n';
        if (classObject.profLink != ""){
            newHTML+='<span class="titlespan"><br><u>Rate My Prof</u>:  </span><a style="text-decoration: none;" href="'+classObject.profLink+'" target="_blank">'+classObject.rating+'</a> \n';
        }
        newHTML += '</h5>\n';
        newHTML +='</p>';
	    popup.innerHTML = newHTML;
    }

    function createHTML() {
        var html = "";
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        var daysAbbrev = ['M', 'T', 'W', 'T', 'F'];
        var uniqueClasses = [];
        $.each(schedules, function (index, schedule) {
            if(schedule.hide){
                return;
            }
            var timeday = '';
            if (schedule.morning == true) {
                timeday = 'morning';
            }
            else {
                timeday = 'afternoon';
            }
            html += '<div id="' + index + '" onClick="seeNewSchedule(this)" class="schClick content type-' + timeday + ' type-' + schedule.numClasses;
            $.each(schedule.classes, function (index, course) {
                html += ' type-' + course.replace(/\s/g, '');
                if (uniqueClasses.indexOf(course) === -1) {
                    uniqueClasses.push(course);
                }
            });
            if (window.location.href.includes("possibleSchedulesB"))
                html += ' condB';
            html += '">\n';
            $.each(schedule.events, function (index, dayEvents) {
                html += '\t<div class="condDay" id="' + days[index] + '">\n';
                html += '\t\t<div class="dayTitle">' + daysAbbrev[index] + ' </div>\n';

                $.each(dayEvents, function (index, event) {
                    var courseIndex = classNameIndex.findIndex(id => id === event.id);
                    var color;
                    if (courseIndex >= 0) {
                        color = 'style="background-color:' + colors[courseIndex] + ';"';
                    } else {
                        classNameIndex.push(event.id);
                        color = 'style="background-color:' + colors[classNameIndex.length - 1] + ';"';
                    }
                    if (event.length > 60)
                        html += '\t\t\t<div ' + color + ' class="class longClass"><span style="margin-left: .3em;float: left;font-size: 9px">' + event.start + '</span><br>' + event.id + '</div>\n';
                    else {
                        html += '\t\t\t<div ' + color + ' class="class shortClass"><span style="margin-left: .3em;float: left;font-size: 9px">' + event.start + '</span><br>' + event.id + '</div>\n';
                    }

                });
                html += '\t</div>\n';

            });
            if (!window.location.href.includes("possibleSchedulesB")) {
                html += '<div style=" background-color: #696969; opacity: .8;height: 3.1em; width:100%; margin-top: .5em; margin-bottom: 0px;" >';

                html += '<button class="btn btn-lg" style="padding:9px 16px; float: left; background-color:#696969; border-radius: 2px;"><i class="fas fa-expand-arrows-alt"></i></button>';
                var starredStatus = (schedule.starred) ? 'starred' : '';
                html += '<button style="padding:9px 16px; float: right; background-color:#696969; z-index: 100;border-radius: 2px; " id="star' + index + '"  class="btn btn-lg possStar"	onclick="event.stopPropagation(), starSchedule(this); "><i class="fas fa-star ' + starredStatus + '"></i></button>';
            }
            html += '</div></div>\n';
        });
        $("#class-filter").append(html);

        var i = 0;
        $.each(uniqueClasses, function (index, course) {
            if (i % 3 == 0)
                $("#courseID").append('<br><br>\n')
            $("#courseID").append('<a href="#" class="filter" data-filter="' + course.replace(/\s/g, '') + '">' + course + '</a>\n')
            i++;

        });
        update();
    }

    function createSchedule(subset, schedules) {
        var schedule = {};
        $.each(subset, function (index, classSubset) {
            var morningCounter = 0;
            var numUnits = 0;
            var events = [
                [],
                [],
                [],
                [],
                []
            ];
            var event = {};
            $.each(classSubset, function (index, course) {
                (course.tags === "afternoon") ? morningCounter-- : morningCounter++;
                numUnits += course.units;
                $.each(course.times, function (indexTime, time) {
                    var calcLength = hrToMinutes(time.end);
                    calcLength -= hrToMinutes(time.start);
                    event = {
                        id: course.id,
                        index: index,
                        start: time.start,
                        end: time.end,
                        day: time.day,
                        length: calcLength
                    }
                    var day = getDay(time.day);
                    var i;
                    for (i = 0; i < events[day].length && hrToMinutes(events[day][i].start) < hrToMinutes(event.start); i++) {
                    }
                    events[day].splice(i, 0, event);

                });
            });
            var collision = false;
            for (var i = 0; i < events.length; i++) {
                if (classCollisionCheack(events[i], i)) {
                    collision = true;
                    break;
                }
            }
            var classes = [];
            for(var i=0; i<classSubset.length; i++)
                classes.push(classSubset[i].id);
            schedule = {
                morning: morningCounter > 0,
                numClasses: classSubset.length,
                starred: false,
                classes: classes,
                events: events,
                hide: false
            };
            if (!collision)
                schedules.push(schedule);
        });
    }

    function hrToMinutes(time) {
        return parseInt(time) * 60 + parseInt(time.substring(3));
    }

    function classCollisionCheack(events, currDay) {
        for (var j = 0; j < events.length; j++) {
            for (var i = j + 1; i < events.length; i++) {
                var aStart = hrToMinutes(events[j].start)
                var bStart = hrToMinutes(events[i].start)
                var aEnd = hrToMinutes(events[j].end)
                var bEnd = hrToMinutes(events[i].end)
                if (aStart > bStart && aStart < bEnd || aEnd > bStart && aStart < bEnd)
                    return true;
            }
        }
        return false;
    }

    function getSubsetsofSizeK(input, k, subset) {
        var s = [];
        if (k <= input.length) {
            for (var i = 0; (s[i] = i) < k - 1; i++);
            subset.push(getSubset(input, s));
            for (; ;) {
                var i;
                for (i = k - 1; i >= 0 && s[i] == input.length - k + i; i--);
                if (i < 0) {
                    break;
                }
                s[i]++;
                for (++i; i < k; i++) {
                    s[i] = s[i - 1] + 1;
                }
                subset.push(getSubset(input, s));
            }
        }
    }

    // generate actual subset by index sequence
    function getSubset(input, subset) {
        var result = [];
        for (var i = 0; i < subset.length; i++)
            result.push(input[subset[i]]);
        return result;
    }

    function starSchedule(e) {
        /*if schedule has class starred --> toggle color of star*/
        if (e.id != "starButt") {
            currentScheduleIndex = e.parentElement.parentElement.id;
            var element2 = document.getElementById('star' + currentScheduleIndex);
            $(element2.children[0]).toggleClass('starred');

        }
        else {
            var element2 = document.getElementById('star' + currentScheduleIndex);
            $('#starButt').toggleClass('starred');
            $(element2.children[0]).toggleClass('starred');

        }

        schedules[currentScheduleIndex].starred = !schedules[currentScheduleIndex].starred;

        if (schedules[currentScheduleIndex].starred) {
            $('div[id=' + currentScheduleIndex + ']').each(function () {
                $(this).addClass("type-starred");
            });
        }
        else {
            $("#" + currentScheduleIndex).each(function () {
                $(this).removeClass("type-starred");
            });
        }
        update();
    }

    function hideNewSchedule() {
        var schedulesdiv = document.getElementById('possSchedules');
        $(schedulesdiv).show();

        var commitdiv = document.getElementById('commSchedule');
        $(commitdiv).hide();
    }

    function sendToEmail(e) {
        var response = prompt("Please enter your email: ");
        if (response != null) {
            alert("Schedule sent to: " + response);
        }
        else {
        }
    }


