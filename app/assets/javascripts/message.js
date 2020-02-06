$(function(){
  function buildHTML(message){
    if( message.photo ){
      var html =
      `<div class="member-info" data-message-id=${message.id}>
          <div class="member-info__member-name">
            ${message.user_name}
          </div>
          <div class="member-info__time-stamp">
            ${message.created_at}
          </div>
      </div>
        <div class="message-items">
          <div class="message">
            ${message.text}
          </div>
          <div class="message-items__message--image">
            <img src=${message.photo} >
          </div>
        </div>`
    return html;
  } else {
    var html =
      `<div class="member-info"  data-message-id=${message.id}>
          <div class="member-info__member-name">
            ${message.user_name}
          </div>
          <div class="member-info__time-stamp">
            ${message.created_at}
          </div>
      </div>
        <div class="message-items">
          <div class="message">
            ${message.text}
          </div>
        </div>
      </div>`
    return html;
  };
}

  $('#new_message').on('submit',function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
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
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.form-box__send-btn').attr('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
  var reloadMessages = function() {
    last_message_id = $('.member-info:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
            var insertHTML = '';
            $.each(messages, function(i, message) {
              insertHTML += buildHTML(message)
            });
            $('.chat-main__message-list:last').append(insertHTML);
            $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
          }
    })
  };
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});