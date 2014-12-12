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
    recFormControl(true);
    rec.lang = $('#selectLang').val();

    rec.start();
  });

  $('#stopButton').click(function(){
    recFormControl(false);

    rec.stop();
  });

  rec.onstart = function(){
    $('#messageArea').html("<p>state: start</p>");
  };

  rec.onend = function(){
    $('#messageArea').html("<p>state: end</p>");
    recFormControl(false);
  };

  rec.onspeechstart = function(){
    $('#messageArea').html("<p>state: speechstart</p>");
  };

  rec.onspeechend = function(){
    $('#messageArea').html("<p>state: speechend</p>");
  };

  rec.onnomatch = function(){
    $('#messageArea').html("<p>state: nomatch</p>");
  };

  rec.onerror = function(){
    $('#messageArea').html("<p>state: error</p>");
    recFormControl(false);
  };

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

  function recFormControl(start){
    if(start){
      $('#startButton').attr('disabled','true');
      $('#stopButton').attr('disabled','false');
      $('#stopButton').removeAttr('disabled');
    }else{
      $('#stopButton').attr('disabled','true');
      $('#startButton').attr('disabled','false');
      $('#startButton').removeAttr('disabled');
    }
  }

})(document,jQuery);
