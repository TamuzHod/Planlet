

$.getJSON('/scheduleJson', { get_param: 'classes' }, function(data) {
    //dp.events.list = data;
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


var dp = new DayPilot.Calendar("dp");
dp.viewType = "Days";
dp.days = 5;


dp.theme = "calendar_green";

// view
dp.startDate = "2018-02-25";  // or just dp.startDate = "2013-03-25";

dp.headerDateFormat = "dddd";
dp.init();

