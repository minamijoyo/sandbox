;(function(d,$){
  if (!('webkitSpeechRecognition' in window)) {
    $('#messageArea').append(
      "<p>Web Speech API には未対応です。Chromeでお試し下さい。</p>"
    );
    return;
  }

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.lang = $('#selectLang').val();
  console.log(recognition.lang);

  $('#startButton').click(function(){
    console.log('start');
  });

  $('#stopButton').click(function(){
    console.log('stop');
  });

})(document,jQuery);
