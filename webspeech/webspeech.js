;(function(d,$){
  if (!('webkitSpeechRecognition' in window)){
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

    $('#startButton').attr('disabled','true');
    $('#stopButton').attr('disabled','false');
    $('#stopButton').removeAttr('disabled');

    rec.lang = $('#selectLang').val();
    console.log(rec.lang);

    rec.start();

  });

  $('#stopButton').click(function(){
    console.log('stop');

    $('#stopButton').attr('disabled','true');
    $('#startButton').attr('disabled','false');
    $('#startButton').removeAttr('disabled');

    rec.stop();

  });

  rec.onresult = function(e){
    var results = e.results;
    for(var i = e.resultIndex; i<results.length; i++){
      if(results[i].isFinal){
        $('#inputText').val(results[i][0].transcript).removeClass('isNotFinal');
      }else{
        $('#inputText').val(results[i][0].transcript).addClass('isNotFinal');
      }
    }
  };

})(document,jQuery);
