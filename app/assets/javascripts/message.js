$(function() {
  function buildHTML(message){
    var img = ""
    if (message.image !== null) {
        img = `<img src="${message.image.url}">`
    }
      var html = 
       `<div class="message" data-message-id=${message.id}>
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="upper-message__date">
              ${message.date}
            </div>
          </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
              ${img}
            </p>
          </div>
        </div>`
      return html;
     
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: "POST",
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
   })
   .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.form__submit').prop('disabled', false); 
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');  
    $('form')[0].reset();
   })
  .fail(function(){
    alert('メッセージを入力してください')
    $('.form__submit').prop('disabled', false);
    });
  
  });
});