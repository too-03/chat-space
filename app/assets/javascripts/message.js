$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-group">
                    <div class="chat-group__info">
                      <div class="chat-group__info__contributor">
                        ${message.user_name}
                      </div>
                      <div class="chat-group__info__time-stamp">
                        ${message.create_at}
                      </div>
                    </div>
                    <div class="chat-group__message">
                      <p class="chat-group__message__body">
                        ${message.body}
                      </p>
                    </div>
                    <img class="chat-group__message__image" src=${message.image}>
                  </div>`
      return html;
    } else {
      var html = `<div class="chat-group">
                    <div class="chat-group__info">
                      <div class="chat-group__info__contributor">
                        ${message.user_name}
                      </div>
                      <div class="chat-group__info__time-stamp">
                        ${message.create_at}
                      </div>
                    </div>
                    <div class="chat-group__message">
                      <p class="chat-group__message__body">
                        ${message.body}
                      </p>
                    </div>
                  </div>`
      return html
    };
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      datatype: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__message-list").append(html);
      $(".chat-main__message-list").animate({ scrollTop: $(".chat-main__message-list")[0].scrollHeight});
      $("form")[0].reset();
      $('.send-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  });
});