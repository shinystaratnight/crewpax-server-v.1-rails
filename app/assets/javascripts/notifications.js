var btnStart = document.querySelector('.start');

// wire up buttons

btnStart.onclick = function() {
  welcomePanel.style.zIndex = '-1';
  init();
  mainLoop();
}


// get permission to run notifications

Notification.requestPermission().then(function(result) {
  console.log(result);
});




// spawn a permission

function spawnNotification(theBody, theIcon, theTitle) {
  var options = {
    body: theBody,
    icon: theIcon
  }
  var n = new Notification(theTitle, options);
  setTimeout(n.close.bind(n), 4000);
}

function randomNotification() {
  var randomQuote = quoteChooser();
  var options = {
    body: randomQuote,
    icon: 'img/sad_head.png',
  }
  var n = new Notification('Emogotchi says', options);
  setTimeout(n.close.bind(n), 4000);
}

// update current image display

function updateDisplay() {
  if(score > 10000) {
    score = 10000;
  }

  if(score <= 2000) {
    curImage = 'well-adjusted';
  } else if(score > 2000 && score <= 5000) {
    curImage = 'happy';
  } else if(score > 5000 && score <= 8000) {
    curImage = 'sad';
  } else if(score > 8000) {
    curImage = 'emo';
  }

  if(updateImage !== curImage) {
    spawnNotification('Whaaa, I\'m becoming well-adjusted, pay attention to me!', 'img/' + curImage + '_head.png', 'Emogotchi says');
    mainImage.src = 'img/' + curImage + '.png';
    updateImage = curImage;
  }

  updateProgress();
}

// run main loop

function mainLoop() {
  score -= 3;
  whingeTally += 1;
  updateDisplay();
  if(score <= 0) {
    score = 0;
    endGame();
  } else {
    if(whingeTally % 750 === 0) {
      randomNotification();
    }

    window.requestAnimationFrame(mainLoop);
  }
}