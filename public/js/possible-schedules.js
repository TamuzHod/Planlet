
var dp = new DayPilot.Calendar("dp");
dp.viewType = "Week";

dp.theme = "calendar_green";

// view
dp.startDate = "2018-02-25";  // or just dp.startDate = "2013-03-25";
dp.viewType = "Week";

// event creating
dp.onTimeRangeSelected = function (args) {
	var name = prompt("New event name:", "Event");
	if (!name) return;
	var e = new DayPilot.Event({
		start: args.start,
		end: args.end,
		id: DayPilot.guid(),
		text: name
	});
	dp.events.add(e);
	dp.clearSelection();
};
alert({{classes}})
dp.onEventClick = function(args) {
	alert("clicked: " + args.e.id());
};

dp.headerDateFormat = "dddd";
dp.init();

//dp.events.list = data;
dp.update();