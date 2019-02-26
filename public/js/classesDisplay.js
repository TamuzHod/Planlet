
var courses;
var major;
var minor;
var college;
function getClasses() {
    $.getJSON('/classes', function (data) {
        courses = data;
        major = document.getElementById("lblMajorClasses").innerHTML;
        minor = document.getElementById("lblMinorClasses").innerHTML;
        college = document.getElementById("spanGEClasses").innerHTML;


        $('#yourDivName').html('yourtHTML');


        var html = "";
        $.each(data[major], function (index, course) {

            html += '<input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckMajor" id = "';
            html += course.id + '" type="checkbox">\n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5> \n';
            if (index + 1 < data[major].length)
                html += '<hr>';
        });
        document.getElementById("majorClasses").innerHTML = html;
        html = "";
        $.each(data[minor], function (index, course) {

            html += '<input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckMinor" id = "';
            html += course.id + '" type="checkbox"> \n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5> \n';
            if (index + 1 < data[minor].length)
                html += '<hr>';
        });
        document.getElementById("minorClasses").innerHTML = html;
        console.log("d"+minor+"d");
        if (minor == "No Minor") {

            $(document.getElementById("minorDiv")).hide();
        }
        html = "";
        $.each(data[college], function (index, course) {

            html += '<input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckCollege" id = "';
            html += course.id + '" type="checkbox"> \n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5> \n';
            if (index + 1 < data[college].length)
                html += '<hr>';
        });
        $('#geClasses').html(html);

    });
};

function generate() {
    var n = $("input:checked").length; /*
    var print = "";
    for (var counter = 0; counter < n; counter++) {
        
        var object = $("input:checked")[counter];
        var string = $(object).attr("id")
        string = string.split('check')[1];
        print = print + " " + string; 
    }
    var result = confirm("Confirm that you want schedules with the following classes:" + print + "."); */
    if (n <3 ) {
        alert("Please select at least 3 classes.")
    }
    else{
        var selectedClasses = [];
        $('.courseCheckMajor').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.push(courses[major].find(course => course.id === obj.id))
        });
        $('.courseCheckMinor').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.push(courses[minor].find(course => course.id === obj.id))
        });
        $('.courseCheckCollege').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.push(courses[college].find(course => course.id === obj.id))
        });
        $.postJSON('/selectedClasses', selectedClasses, function (result) {
            console.log('result', result);
        });
        window.location.href = '/possibleSchedules/' + major + '/' + minor + '/' + college;
    }
}

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


$( document ).ready(function() {
    var majorDiv = document.getElementById("majorClasses");
    majorDiv.addEventListener("click", function() {
        if (this.style.maxHeight == this.scrollHeight + "px"){
            this.style.maxHeight = "0px";
        } else {
            this.style.maxHeight = this.scrollHeight + "px";
        } 
    });
});


