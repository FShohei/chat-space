$(function() {
  function buildHTML(message){
    var img = (message.image) ? `<img class="chat-content__image" src="${message.image}">` : '';
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
            </p>
            ${img}
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
  
  //自動更新機能実装の処理
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
     var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
   }
  };
  setInterval(reloadMessages, 5000);
});
