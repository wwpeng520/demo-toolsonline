$(function () {

     $("#htmlBeautify").click(function () {
        require(["./js/js-beautify/beautify-html"],function(html_beautify){
            var input = document.getElementById("enterArea").value;
            var output = html_beautify.html_beautify(input);
            document.getElementById("outArea").innerHTML = output;
        });
     });
    $("#cssBeautify").click(function () {
        require(["./js/js-beautify/beautify-css"],function(css_beautify){
            var input = document.getElementById("enterArea").value;
            var output = css_beautify.css_beautify(input);
            document.getElementById("outArea").innerHTML = output;
        });
    });
    $("#jsBeautify").click(function () {
        require(["./js/js-beautify/beautify"],function(js_beautify){
            var input = document.getElementById("enterArea").value;
            var output = js_beautify.js_beautify(input);
            document.getElementById("outArea").innerHTML = output;
        });
    });


});
