
// jQuery
$.getScript('/js/daypilot-all.min.js', function()
{
    
var dp = new DayPilot.Calendar("dp");
dp.viewType = "Days";
dp.days = 5;
dp.start = "7:00"

dp.theme = "calendar_green";

// view
dp.startDate = "2018-02-26";  // or just dp.startDate = "2013-03-25";

dp.headerDateFormat = "dddd";
dp.init();

$.getJSON('/scheduleJson', { get_param: 'classes' }, function(data) {
    var id;
    var text;
    $.each(data.classes, function(index, course) {
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

});

