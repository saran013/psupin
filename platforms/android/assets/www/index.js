/*
*  This event listener will populate the top of the home screen with user stories when the page is initialized.
*  It uses the generateStoryBubbles function to do so.
*/

document.addEventListener('init', function (event) {

  var page = event.target;

  if (page.id == "home-page") {
    var stories = page.querySelector('#stories');
    generateStoryBubbles(stories);

  }

});

//The show event listener does the same thing as the one above but on the search page when it's shown.

document.addEventListener('show', function (event) {
  var page = event.target;

  if (page.id == "search-page") {
    var channels = page.querySelector('#channels');
    generateStoryBubbles(channels);
  }
});

/*
* This function is used to toggle the grid/list display of the posts in the profile page as well as
* change the color of the buttons to show which is the current view.
*/

function display(id) {
  document.getElementById("list").style.color = "#1f1f21";
  document.getElementById("grid").style.color = "#1f1f21";
  document.getElementById(id).style.color = "#5fb4f4";

  document.getElementById("list_view").style.display = "none";
  document.getElementById("grid_view").style.display = "none";
  document.getElementById(id + "_view").style.display = "block";
}

//The generateStoryBubbles function is used to create the carousel items be used as stories by the upper two events.

function generateStoryBubbles(element) {
  for (var i = 0; i < 9; i++) {
    element.appendChild(ons.createElement(
      '<ons-carousel-item>' +
      '<div class="story">' +
      '<div class="story-thumbnail-wraper unread"><img class="story-thumbnail" src="assets/img/profile-image-0' + (i + 1) + '.png" onclick="readStory(this)"></div>' +
      '<p>david_graham</p>' +
      '</div>' +
      '</ons-carousel-item>'
    ));
  }
}

//The Like function is used to make the white heart appear in front of the picture as well as make the like button into a red heart and vice versa.

var like = function (num) {
  if (document.getElementById("button-post-like-" + num).classList.contains("like")) {
    document.getElementById("button-post-like-" + num).classList.remove("ion-ios-heart", "like");
    document.getElementById("button-post-like-" + num).classList.add("ion-ios-heart-outline");
  } else {
    document.getElementById("button-post-like-" + num).classList.remove("ion-ios-heart-outline");
    document.getElementById("button-post-like-" + num).classList.add("ion-ios-heart", "like");
    document.getElementById("post-like-" + num).style.opacity = 1;

    setTimeout(function () {
      document.getElementById("post-like-" + num).style.opacity = 0;
    }, 600);
  }
}

//The readStory function is used to change the red circle around a new story into grey after tapping on the new storry (thus reading it)

var readStory = function (event) {
  event.parentNode.classList.remove("unread");
  event.parentNode.classList.add("read");
}

function tackpic() {
  console.log('ready');

  console.log("Take a photo");
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI
  });

  function onSuccess(imageURI) {
    console.log(imageURI);
    var image = $("#preview");
    image.attr("src", imageURI);
  }

  function onFail(message) {
    alert('Failed because: ' + message);
  }

}

$.get("http://localhost:3000/pins", function (data) {
  var test = $('#template').html();
  for (var i = 0; i < data.length; i++) {
    var rendered = Mustache.render(test, data[i]);
    $("#pins").append(rendered);
  }
});
function initTimeline(event) {

  var url = "http://localhost:3000/pins";
  $.get(url, function (data) {
    $("#timetab").attr("badge", data.length);
    $.each(data, function (index, item) {
      $.get('card.html', function (template) {
        var rendered = Mustache.render(template, item);
        $("#pins").append(rendered);
      });
    });
  });
}
function add() {
  var lat;
  var lng;

  $.post("http://localhost:3000/pins", {
    photo: "http://img.painaidii.com/images/20160629_3_1467191751_613818.jpg",
    lat: lat,
    lng: lng,
    description: $("#desc").val()
  });
  alert('complete');
  location.reload('index.html');
}
function deletePin(id) {
  var url = "http://localhost:3000/pins";
  $.ajax({
      url: url + "/" + id,
      method: "DELETE",
      success: function (data, status, xhr) {
          location.reload();
      }
  });
}

function editpost(id) {
  
  var url = "http://localhost:3000/pins";
  $("#desc" + id).hide();
  $("#desc" + id).prop(description);
  

}