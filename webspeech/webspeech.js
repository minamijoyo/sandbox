;(function(d,$){
  if (!('SpeechSynthesisUtterance' in window)){
    $('#messageArea').html(
      "<p>Web Speech API には未対応です。Chromeでお試し下さい。</p>"
    );
    return;
  }

  $('#synthesisButton').click(function(){
    var synthesis = new SpeechSynthesisUtterance();
    synthesis.volume = 1;
    synthesis.rate = 1;
    synthesis.pitch = 2;
    synthesis.text = $('#synthesisText').val();
    synthesis.lang = $('#selectLang').val();

    speechSynthesis.speak(synthesis);
  });

  if (!('webkitSpeechRecognition' in window)){
    $('#messageArea').html(
      "<p>Web Speech API には未対応です。Chromeでお試し下さい。</p>"
    );
    return;
  }

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  $('#recognitionStartButton').click(function(){
    recognitionFormControl(true);
    recognition.lang = $('#selectLang').val();

    recognition.start();
  });

  $('#recognitionStopButton').click(function(){
    recognitionFormControl(false);

    recognition.stop();
  });

  recognition.onstart = function(){
    $('#messageArea').html("<p>state: start</p>");
  };

  recognition.onend = function(){
    $('#messageArea').html("<p>state: end</p>");
    recognitionFormControl(false);
  };

  recognition.onspeechstart = function(){
    $('#messageArea').html("<p>state: speechstart</p>");
  };

  recognition.onspeechend = function(){
    $('#messageArea').html("<p>state: speechend</p>");
  };

  recognition.onnomatch = function(){
    $('#messageArea').html("<p>state: nomatch</p>");
  };

  recognition.onerror = function(){
    $('#messageArea').html("<p>state: error</p>");
    recognitionFormControl(false);
  };

  recognition.onresult = function(e){
    var results = e.results;
    for(var i = e.resultIndex; i<results.length; i++){
      if(results[i].isFinal){
        $('#recognitionText').val(results[i][0].transcript).removeClass('isNotFinal');
      }else{
        $('#recognitionText').val(results[i][0].transcript).addClass('isNotFinal');
      }
    }
  };

  function recognitionFormControl(start){
    if(start){
      $('#recognitionStartButton').attr('disabled','true');
      $('#recognitionStopButton').attr('disabled','false');
      $('#recognitionStopButton').removeAttr('disabled');
    }else{
      $('#recognitionStopButton').attr('disabled','true');
      $('#recognitionStartButton').attr('disabled','false');
      $('#recognitionStartButton').removeAttr('disabled');
    }
  }

})(document,jQuery);
