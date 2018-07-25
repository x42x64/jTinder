/**
 * jTinder initialization
 */

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

var currentPaneStyle = 5

function addToStack(){
    var cardId = uuidv4();
    $("#tinderslide > ul").prepend("<li class=\"pane"+currentPaneStyle+"\" id=\""+cardId+"\"><div class=\"img\"></div><div>Beach</div><div class=\"like\"></div><div class=\"dislike\"></div></li>");
    $.getJSON("demodata.json", function (json, status){
              console.log(status);
              $("#"+cardId + " > .img").css({"background-image": "url(\""+json.data+"\") no-repeat scroll center center", "background-size": "contain"});
            });

    currentPaneStyle--;
    if(currentPaneStyle<1)
    {
         currentPaneStyle=5;
    }
}

addToStack();
addToStack();
addToStack();

$(document).ready(function(){

$("#tinderslide").jTinder({
	// dislike callback
    onDislike: function (item) {
	    // set the status text
        $('#status').html('Dislike image ' + (item.index()+1));
    },
	// like callback
    onLike: function (item) {
	    // set the status text
        $('#status').html('Like image ' + (item.index()+1));
    },
    onBeforeNext: function (item) {
        addToStack();
        $("#tinderslide").jTinder('startOver');
        item.remove();
    },
	animationRevertSpeed: 200,
	animationSpeed: 400,
	threshold: 1,
	likeSelector: '.like',
	dislikeSelector: '.dislike'
});

$(document).keypress(function(event) {
    if ( event.keyCode == 37 ) {
        event.preventDefault();
        $("#tinderslide").jTinder('dislike');
    }
    else if ( event.keyCode == 39 ) {
        event.preventDefault();
        $("#tinderslide").jTinder('like');
    }
});

/**
 * Set button action to trigger jTinder like & dislike.
 */
$('.actions .like, .actions .dislike').click(function(e){
	e.preventDefault();
	$("#tinderslide").jTinder($(this).attr('class'));
});

});
