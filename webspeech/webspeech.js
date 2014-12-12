;(function(d,$){
  if (!('webkitSpeechRecognition' in window)) {
    $('#messageArea').html(
      "<p>Web Speech API には未対応です。Chromeでお試し下さい。</p>"
    );
    return;
  }

  var rec = new webkitSpeechRecognition();
  rec.continuous = true;
  rec.interimResults = true;

  $('#startButton').click(function(){
    console.log('start');
    rec.lang = $('#selectLang').val();
    console.log(rec.lang);

  });

  $('#stopButton').click(function(){
    console.log('stop');
  });

})(document,jQuery);
