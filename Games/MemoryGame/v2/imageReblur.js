

// ****** select items **********

window.onload = function() {
    var images = document.getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click',showAnswer);
      images[i].ondblclick = reblur;

    }
  };

  function showAnswer(eventObj) {
     var image = eventObj.target;
     var name = image.id;
      name = name + ".jpg";
     image.src = name;
    //setTimeout(reblur, 7500, image);
  }

  function reblur(eventObj) {
    var image = eventObj.target;
    var name = image.id;
    name ="minus.jpg";
    image.src = name;
  }