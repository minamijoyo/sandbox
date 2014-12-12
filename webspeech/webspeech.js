;(function(d,$){
  if (!('webkitSpeechRecognition' in window)) {
    $('#messageArea').html(
      "<p>Web Speech API には未対応です。Chromeでお試し下さい。</p>"
    );
    return;
  }

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  $('#startButton').click(function(){
    console.log('start');
    recognition.lang = $('#selectLang').val();
    console.log(recognition.lang);

  });

  $('#stopButton').click(function(){
    console.log('stop');
  });

})(document,jQuery);
