function createCondensedSchedule() {
	for (var schedule in schedules) {
		var html = "";
		var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
		var daysAbbrev = ['M', 'T', 'W', 'T', 'F'];

		for (var daynum = 0; daynum < 5; daynum++) {
			var day = days[daynum];
			var dayAbbrev = daysAbbrev[daynum];
			html += '<div class="schCond content type-' + 'NUMBEROFCLASSES">\n';
			html += '<div class="condDay">\n';
			html += '<div class="dayTitle">\n' + dayAbbrev + '\n </div>\n';

			for (var subject in MONDAY) {
				var subjectID = subject.GETID;
				var subjectLength = subject.GETLENGTH;
				html += '<div class="class">\n subjectID\n</div>\n';
			}
			html += '</div>\n';
		}
		html += '</div>\n';
	}
}

/*
<!--<div class="schCond content type-3">
					<div class="condDay" id="monday">
						<div class="dayTitle">
							M
                        </div>


						<div class="class">
							120
						</div>

						<div class="class longClass">
							100
						</div>
					</div>


					<div class="condDay" id="tuesday">
						<div class="dayTitle">
							T
						</div>
						<div class="class shortClass">
							120
						</div>

						<div class="class longClass">
							100
						</div>
					</div>



					<div class="condDay" id="wednesday">
						<div class="dayTitle">
							W
						</div>
						<div class="class shortClass">
							120
						</div>
					</div>



					<div class="condDay" id="thursday">
						<div class="dayTitle">
							Th
						</div>
						<div class="class longClass">
							100
						</div>
					</div>


					<div class="condDay" id="friday">
						<div class="dayTitle">
							F
						</div>
						<div class="class shortClass">
							120
						</div>
					</div>
				</div> /*