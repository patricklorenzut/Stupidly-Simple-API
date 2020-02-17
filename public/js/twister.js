var titletwister = function () {

    var titles = window.UnderpolishedTitles;
          
    var titles = titles.split("///")

    //shuffle it up
    for (var i = titles.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = titles[i];
        titles[i] = titles[j];
        titles[j] = temp;
    }

    var index = 0

    var origTitle = document.title;
    function oldTitle() {
        document.title = origTitle;
    }
    function newTitle() {
        document.title = titles[index];
        if(index < (titles.length - 1)){
            index += 1
        }else{
            index = 0
        }
    }
    window.onblur = newTitle;
    window.onfocus = oldTitle;
}();
