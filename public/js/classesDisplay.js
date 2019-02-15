

function getClasses() {
    $.getJSON('/classes', function(data) {
        var major = document.getElementById("lblMajorClasses").innerHTML;
        var minor = document.getElementById("lblMinorClasses").innerHTML;
        var college = document.getElementById("lblGEClasses").innerHTML;

        $.each(data[major], function(index, course) {
            id = course.id;
            text = course.text;
        });
        $.each(data[major], function(index, course) {
            id = course.id;
            text = course.text;
        });
        $.each(data[major], function(index, course) {
            id = course.id;
            text = course.text;
        });
    });
};