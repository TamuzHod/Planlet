var courses;
var major;
var minor;
var college;
function getClasses() {
    $.getJSON('/classes', function (data) {
        courses = data;
        major = document.getElementById("spanMajorClasses").innerHTML;
        minor = document.getElementById("spanMinorClasses").innerHTML;
        college = document.getElementById("spanGEClasses").innerHTML;


        $('#yourDivName').html('yourtHTML');


        var html = "";
        html+='<p  id="majorp"  style="position: relative; bottom: .5em;"><span style="float: left;">'+data[major].length + ' Classes</span> <span style="float: right;">0 Selected</span><br><br></p>';
        $.each(data[major], function (index, course) {
            html += '<div style="padding-top:20px;" id = "' + course.id + 'div" onclick="selectClass(this)"><input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckMajor"  id = "';
            html += course.id + '"type="checkbox">\n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5>\n';
            if (index + 1 < data[major].length)
                html += '<hr style="margin-bottom: 0px;">';
            html += '</div>'
        });
        document.getElementById("majorClasses").innerHTML = html;
        html = "";
        html+='<p  id="minorp"  style="position: relative; bottom: .5em;"><span style="float: left;">'+data[minor].length + ' Classes</span> <span style="float: right;">0 Selected</span><br><br></p>';
        $.each(data[minor], function (index, course) {

            html += '<div style="padding-top:20px;" id = "' + course.id + 'div" onclick="selectClass(this)"><p id="minorp" style="position: relative; bottom: .5em;"></p><input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckMinor" id = "';
            html += course.id + '" type="checkbox"> \n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5> \n';
            if (index + 1 < data[minor].length)
                html += '<hr style="margin-bottom: 0px;"></div>';
            html += '</div>'
        });
        document.getElementById("minorClasses").innerHTML = html;
        console.log("d" + minor + "d");
        if (minor == "No Minor") {

            $(document.getElementById("minorDiv")).hide();
        }
        html = "";
        html+='<p  id="collegep"  style="position: relative; bottom: .5em;"><span style="float: left;">'+data[college].length + ' Classes</span> <span style="float: right;">0 Selected</span><br><br></p>';
        $.each(data[college], function (index, course) {

            html += '<div style="padding-top:20px;" id = "' + course.id + 'div" onclick="selectClass(this)"><p id="collegep" style="position: relative; bottom: .5em;"></p><input style="width: 30px; height: 30px; display: inline-block; float: right;" class="courseCheckCollege" id = "';
            html += course.id + '" type="checkbox"> \n';
            html += '<h6 style="font-size: 10px; color: gray; margin: 0px;">' + course.id + '(' + course.units + 'u)</h4> \n';
            html += '<h5 style="font-size: 15px; width: 80%; margin-top: 5px;">' + course.title + '</h5> \n';
            if (index + 1 < data[college].length)
                html += '<hr style="margin-bottom: 0px;"></div>';
            html+='</div>'
        });
        $('#geClasses').html(html);

    });
};

function selectClass(e){
    console.log(e.id);
    $(e).toggleClass("selectedClass");
    var newstring = e.id.split("div");
    console.log(newstring[0]);
    var element = (document.getElementById(newstring[0]));
    if ($(element).attr("checked") == "checked"){
        console.log($(element).attr("checked"));
        element.removeAttribute("checked");
        console.log($(element).attr("checked"));
    }
    else{
        element.setAttribute("checked", "checked");
    }
}

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
    if (n < 3) {
        alert("Please select at least 3 classes.")
    }
    else {
        var selectedClasses = {classes : []};
        $('.courseCheckMajor').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.classes.push(courses[major].find(course => course.id === obj.id))
        });
        $('.courseCheckMinor').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.classes.push(courses[minor].find(course => course.id === obj.id))
        });
        $('.courseCheckCollege').each(function (i, obj) {
            if (obj.checked)
                selectedClasses.classes.push(courses[college].find(course => course.id === obj.id))
        });

        selectedClasses.majorName = major;
        selectedClasses.minorName = minor;
        selectedClasses.collegeName = college;

        $.postJSON('/selectedClasses', selectedClasses, function (result) {
            console.log('result', result);
        });
        window.location.href = '/possibleSchedules/';
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






/*Neve's messy code for collapsibles. Sorry for the messiness!!!!!!!!*/

function changeCarrot(carrot, direction){
    if (direction == "down"){
        $(carrot).removeClass("fas fa-angle-up");
        $(carrot).addClass("fas fa-angle-down");
    }
    else if (direction == "up"){
        $(carrot).removeClass("fas fa-angle-down");
        $(carrot).addClass("fas fa-angle-up");
    }
}

function collapseMajor(){
    var majorDiv = document.getElementById("majorClasses");
    var numClasses = majorDiv.querySelectorAll("input").length; 
    var checkedClasses = majorDiv.querySelectorAll('input[type="checkbox"]:checked').length;
    changeCarrot(document.getElementById("majorCarrot"),"down");
    $(document.getElementById("majorp")).html('<span style="float: left;">'+numClasses + ' Classes</span> <span style="float: right;">'+checkedClasses + ' Selected</span><br><br>');
    majorDiv.style.maxHeight = "0px";
}

function collapseMinor(){
    var minorTitle = document.getElementById("lblMinorClasses");
    var minorDiv = document.getElementById("minorClasses");
    var numClasses = minorDiv.querySelectorAll("input").length; 
    var checkedClasses = minorDiv.querySelectorAll('input[type="checkbox"]:checked').length;
    changeCarrot(document.getElementById("minorCarrot"), "down");
    $(document.getElementById("minorp")).html('<span style="float: left;">'+numClasses + ' Classes</span> <span style="float: right;">'+checkedClasses + ' Selected</span><br><br>');
    minorDiv.style.maxHeight = "0px";

}

function collapseGE(){
    var geDiv = document.getElementById("geClasses");
    var numClasses = geDiv.querySelectorAll("input").length; 
    changeCarrot(document.getElementById("geCarrot"), "down");
    var checkedClasses = geDiv.querySelectorAll('input[type="checkbox"]:checked').length;
    $(document.getElementById("collegep")).html('<span style="float: left;">'+numClasses + ' Classes</span> <span style="float: right;">'+checkedClasses + ' Selected</span><br><br>');
    geDiv.style.maxHeight = "0px";
}


$(document).ready(function () {
    collapseMinor();
    collapseMajor();
    collapseGE();
    var majorTitle = document.getElementById("lblMajorClasses");
    var minorTitle = document.getElementById("lblMinorClasses");
    var geTitle = document.getElementById("lblGEClasses");
    majorTitle.addEventListener("click", function () {
        var majorDiv = document.getElementById("majorClasses");
        var numClasses = majorDiv.querySelectorAll("input").length; 
        var checkedClasses = majorDiv.querySelectorAll('input[type="checkbox"]:checked').length;
        if (majorDiv.style.maxHeight == majorDiv.scrollHeight + "px") {
            collapseMajor();
        } else {
            $(document.getElementById("majorp")).html("");
            collapseMinor();
            collapseGE();
            changeCarrot(document.getElementById("majorCarrot"), "up");
            majorDiv.style.maxHeight = majorDiv.scrollHeight + "px";
        }
    });

    minorTitle.addEventListener("click", function () {
        var minorDiv = document.getElementById("minorClasses");
        var numClasses = minorDiv.querySelectorAll("input").length; 
        var checkedClasses = minorDiv.querySelectorAll('input[type="checkbox"]:checked').length;
        if (minorDiv.style.maxHeight == minorDiv.scrollHeight + "px") {
            collapseMinor();
        } else {
            $(document.getElementById("minorp")).html("");
            collapseMajor();
            collapseGE();
            changeCarrot(document.getElementById("minorCarrot"), "up");
            minorDiv.style.maxHeight = minorDiv.scrollHeight + "px";
        }
    });

    geTitle.addEventListener("click", function () {
        var geDiv = document.getElementById("geClasses");
        var numClasses = geDiv.querySelectorAll("input").length; 
        var checkedClasses = geDiv.querySelectorAll('input[type="checkbox"]:checked').length;
        if (geDiv.style.maxHeight == geDiv.scrollHeight + "px") {
            collapseGE();
        } else {
            $(document.getElementById("collegep")).html("");
            collapseMajor();
            collapseMinor();
            changeCarrot(document.getElementById("geCarrot"), "up");
            geDiv.style.maxHeight = geDiv.scrollHeight + "px";
        }
    });
});


