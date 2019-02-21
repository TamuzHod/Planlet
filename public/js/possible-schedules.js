
// jQuery
$.getScript('/js/daypilot-all.min.js', function()
{



var subset3 = [];
var subset4 = [];
var subset5 = [];
var schedules = [];

$.getJSON('/getSelectedClasses', { get_param: 'classes' }, function(data) {

    getSubsetsofSizeK(data, 3, subset3);
    getSubsetsofSizeK(data, 4, subset4);
    getSubsetsofSizeK(data, 5, subset5);
    createSchedule(subset3, schedules);
    createSchedule(subset4, schedules);
    createSchedule(subset5, schedules);

    createHTML();

});

function createHTML() {
    
}

function createSchedule(subset, schedules) {
    var schedule = {};
    $.each(subset, function(index, classSubset){
        var morningCounter = 0;
        var numUnits = 0;
        var events = [];
        var event = {};
        $.each(classSubset, function(index, course) {
            (course.tags === "afternoon") ? morningCounter-- : morningCounter++;
            numUnits += course.units;
            $.each(course.times, function(indexTime, time) {
                var calcLength = parseInt(time.end) * 60 + parseInt(time.end.substring(3))
                calcLength -= parseInt(time.start) * 60 + parseInt(time.start.substring(3))
                event = {
                    id: course.id,
                    index: index,
                    start: time.start,
                    end: time.end,
                    day: time.day,
                    length: 
                }
            });
        });
        schedule = {
          morning: morningCounter > 0,
          numClasses : classSubset.length,
          starred: false,
          classes: classSubset
          events
        };
        schedules.push(schedule);

    });
}

function getSubsetsofSizeK(input, k, subset) {
    var s = [];                  // here we'll keep indices 
    if (k <= input.length) {
        // first index sequence: 0, 1, 2, ...
        for (var i = 0; (s[i] = i) < k - 1; i++);  
            subset.push(getSubset(input, s));
        for(;;) {
            var i;
            // find position of item that can be incremented
            for (i = k - 1; i >= 0 && s[i] == input.length - k + i; i--); 
                if (i < 0) {
                    break;
                }
            s[i]++;                    // increment this item
            for (++i; i < k; i++) {    // fill up remaining items
                s[i] = s[i - 1] + 1; 
            }
            subset.push(getSubset(input, s));
        }
    }
} 

// generate actual subset by index sequence
function getSubset(input,subset) {
    var result = []; 
    for (var i = 0; i < subset.length; i++) 
        result.push(input[subset[i]]);
    return result;
}


});

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