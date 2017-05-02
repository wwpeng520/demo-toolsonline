$(function () {


    //解决li标签inline-block时的间隔
    $('.remove-text-nodes').contents().filter(function() {
        return this.nodeType === 3;
    }).remove();

});
