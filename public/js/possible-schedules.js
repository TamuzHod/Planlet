
    var schedules = [];
    var currentScheduleIndex;

    var colors = ["Chocolate", "Peru", "Sienna", "Goldenrod", "Brown", "Maroon", "pink", "orange", "violet", "Tomato", "DarkRed", "LightCoral"]
    var classNameIndex = [];

// jQuery
$.getScript('/js/daypilot-all.min.js', function () {

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




$.getJSON('/getSelectedClasses', { get_param: 'classes' }, function (data) {
    if(!$('#0').length){
        getSubsetsofSizeK(data, 3, subset3);
        getSubsetsofSizeK(data, 4, subset4);
        getSubsetsofSizeK(data, 5, subset5);
        createSchedule(subset3, schedules);
        createSchedule(subset4, schedules);
        createSchedule(subset5, schedules);

        createHTML(schedules);

        addEventListners();
    }
}); 
  


    "2019-02-18T10:00:00"
    "2015-01-01T00:00:00"


    function seeNewSchedule(scheduleHTML) {


        var dp = new DayPilot.Calendar("DP");
        dp.viewType = "Days";
        dp.days = 5;
        currentScheduleIndex = scheduleHTML.id;
        schedule = schedules[currentScheduleIndex];
        dp.theme = "calendar_green";
        dp.businessBeginsHour = 7;
        dp.businessEndsHour = 20;
        // view
        dp.startDate = "2019-02-11";  // or just dp.startDate = "2013-03-25";
        dp.headerDateFormat = "dddd";
        dp.showNonBusiness = false;
        dp.init();

        $.each(schedule.events, function(index, day) {
            $.each(day, function(index, event) {
                var e = new DayPilot.Event({
                    start: dp.startDate.value.substring(0,9) + (1+getDay(event.day)) + "T" + event.start + ":00",
                    end: dp.startDate.value.substring(0,9) + (1+getDay(event.day)) + "T" + event.end + ":00",
                    id: event.id,
                    text: schedule.classes[event.index].title,

                });
                dp.events.add(e);
            });
        });
        dp.update();
        
        var schedulesdiv = document.getElementById('possSchedules');
        $(schedulesdiv).hide();

        
        var element = document.getElementById("starButt");
        if(schedules[currentScheduleIndex].starred)
            $(element).addClass('starred');
        else
            $(element).removeClass('starred');

        var commitdiv = document.getElementById('commSchedule');
        $(commitdiv).show();
    }




    

    function addEventListners(){
        $.each($('div.schClick'), function (index, schedule) {
            schedule.addEventListener("click", function () {
                seeNewSchedule(this);
            });
        });
    }

    function createHTML() {
        var html = "";
        var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
        var daysAbbrev = ['M', 'T', 'W', 'T', 'F'];

        $.each(schedules, function (index, schedule) {
            var timeday = '';
            if (schedule.morning == true) {
                timeday = 'morning';
            }
            else {
                timeday = 'afternoon';
            }
            html += '<div id="' + index + '" class="schClick content type-' + timeday + ' type-' + schedule.numClasses + '">\n';
            $.each(schedule.events, function (index, dayEvents) {
                html += '\t<div class="condDay" id="' + days[index] + '">\n';
                html += '\t\t<div class="dayTitle">' + daysAbbrev[index] + ' </div>\n';

                $.each(dayEvents, function (index, event) {
                    var courseIndex = classNameIndex.findIndex(id => id === event.id);
                    var color;
                    if(courseIndex >= 0) {
                        color = 'style="background-color:'+colors[courseIndex]+';"';
                    }else {
                        classNameIndex.push(event.id);
                        color = 'style="background-color:'+colors[classNameIndex.length-1]+';"';
                    }
                    if (event.length > 60)
                        html += '\t\t\t<div '+color+' class="class longClass">' + event.id + '</div>\n';
                    else {
                        html += '\t\t\t<div '+color+' class="class shortClass">' + event.id + '</div>\n';
                    }

                });
                html += '\t</div>\n';
            });
            html += '</div>\n';
        });
        $("#class-filter").append(html);
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
                    events[getDay(time.day)].push(event)
                });
            });
            var collision = false;
            for (var i = 0; i < events.length; i++) {
                if (classCollisionCheack(events[i])) {
                    collision = true;
                    break;
                }
            }

            schedule = {
                morning: morningCounter > 0,
                numClasses: classSubset.length,
                starred: false,
                classes: classSubset,
                events: events
            };
            if (!collision)
                schedules.push(schedule);
        });
    }

    function hrToMinutes(time) {
        return parseInt(time) * 60 + parseInt(time.substring(3));
    }

    function classCollisionCheack(events) {
        for (var j = 0; j < events.length; j++) {
            for (var i = j + 1; i < events.length; i++) {
                var aStart = hrToMinutes(events[j].start)
                var bStart = hrToMinutes(events[i].start)
                var aEnd = hrToMinutes(events[j].end)
                var bEnd = hrToMinutes(events[i].end)
                if (aStart > bStart && aStart < bEnd || aEnd > bStart && aStart < bEnd)
                    return true;
            }
            return false;
        }
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

});

function starSchedule(e) {
    /*if schedule has class starred --> toggle color of star*/

    var element = document.getElementById("starButt");
    $(element).toggleClass('starred');
    schedules[currentScheduleIndex].starred = !schedules[currentScheduleIndex].starred;

    if(schedules[currentScheduleIndex].starred)
        $("#"+currentScheduleIndex).addClass("type-starred");
    else
        $("#"+currentScheduleIndex).removeClass("type-starred");

}

function hideNewSchedule(){
    var schedulesdiv = document.getElementById('possSchedules');
    $(schedulesdiv).show();

    var commitdiv = document.getElementById('commSchedule');
    $(commitdiv).hide();
}

function sendToEmail(e){
    var response = prompt("Please enter your email: ");
    if (response != null){
        alert("Schedule sent to: " + response);
    }
    else{
    }
}





/*    var i = 0;
    $.each(subsets3, function(index, courseSubset){

        i++;
        var div = '<div id="'+i+'" class="container content type-3"> \n';
        div += '<div id="DP'+i+'"> \n'
        $("#class-filter").append(div);

        // $('#class-filter').append(
        //   $('<div/>')
        //     .attr("id", "newDiv1")
        //     .addClass("newDiv purple bloated")
        //     .append("<span/>")
        //       .text("hello world")
        // );

        var dp = new DayPilot.Calendar("DP"+i);
        dp.viewType = "Days";
        dp.days = 5;

        dp.theme = "calendar_green";
        // view
        dp.startDate = "2018-02-26T00:00:00";  // or just dp.startDate = "2013-03-25";
        dp.headerDateFormat = "dddd";
        dp.showNonBusiness = false;

        dp.init();


        var id;
        var text;

        $.each(courseSubset, function(index, course) {
            id = course.id;
            text = course.title;
            $.each(course.times, function(index, time) {
                var e = new DayPilot.Event({
                    start: time.start,
                    end: time.end,
                    id: id,
                    text: text,
                    moveDisabled: true

                });
                dp.events.add(e);
            });
        });
        dp.update();
    });*/