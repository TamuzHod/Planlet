
// jQuery
$.getScript('/js/daypilot-all.min.js', function()
{



var subsets3 = [];
var subsets4 = [];
var subsets5 = [];

$.getJSON('/scheduleJson', { get_param: 'classes' }, function(data) {

    getSubsetsofSizeK(data.classes, 3);
    getSubsetsofSizeK(data.classes, 4);
    getSubsetsofSizeK(data.classes, 5);

    createHTML();

});

function createHTML() {
    var i = 0;
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
        dp.start = "7:00"

        dp.theme = "calendar_green";

        // view
        dp.startDate = "2018-02-26";  // or just dp.startDate = "2013-03-25";

        dp.headerDateFormat = "dddd";
        dp.init();
        var id;
        var text;

        $.each(courseSubset, function(index, course) {
            id = course.id;
            text = course.text;
            $.each(course.times, function(index, time) {
                var e = new DayPilot.Event({
                    start: time.start,
                    end: time.end,
                    id: id,
                    text: text
                });
                dp.events.add(e);
            });
        });
        dp.update();
    });

    $.each(subsets4, function(index, courseSubset){

        i++;
        var div = '<div id="'+i+'" class="container content type-4"> \n';
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
        dp.start = "7:00"

        dp.theme = "calendar_green";

        // view
        dp.startDate = "2018-02-26";  // or just dp.startDate = "2013-03-25";

        dp.headerDateFormat = "dddd";
        dp.init();
        var id;
        var text;

        $.each(courseSubset, function(index, course) {
            id = course.id;
            text = course.text;
            $.each(course.times, function(index, time) {
                var e = new DayPilot.Event({
                    start: time.start,
                    end: time.end,
                    id: id,
                    text: text
                });
                dp.events.add(e);
            });
        });
        dp.update();
    });

    $.each(subsets5, function(index, courseSubset){

        i++;
        var div = '<div id="'+i+'" class="container content type-5"> \n';
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
        dp.start = "7:00"

        dp.theme = "calendar_green";

        // view
        dp.startDate = "2018-02-26";  // or just dp.startDate = "2013-03-25";

        dp.headerDateFormat = "dddd";
        dp.init();
        var id;
        var text;

        $.each(courseSubset, function(index, course) {
            id = course.id;
            text = course.text;
            $.each(course.times, function(index, time) {
                var e = new DayPilot.Event({
                    start: time.start,
                    end: time.end,
                    id: id,
                    text: text
                });
                dp.events.add(e);
            });
        });
        dp.update();
    });
}

function getSubsetsofSizeK(input, k) {
    var s = [];                  // here we'll keep indices 
    if (k <= input.length) {
        // first index sequence: 0, 1, 2, ...
        for (var i = 0; (s[i] = i) < k - 1; i++);  
            subsets3.push(getSubset(input, s));
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
            subsets3.push(getSubset(input, s));
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

