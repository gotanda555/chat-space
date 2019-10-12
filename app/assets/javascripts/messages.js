$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var content = message.content ? `${ message.content }` : "";
    var html = `  <div class="all__chat__main__class">
                    <div class="all__chat__main__class__name">
                      <p class="all__chat__main__class__name__group">
                        ${message.user_name}
                        </p>
                      <p class="all__chat__main__class__name__info">
                        ${message.date}
                        </p>
                        </div>
                    <div class="all__chat__main__class__message">
                      <div class=lower-message_content>
                      ${content}
                      </div>
                      ${img}
                      </p>
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
    $('.all__chat__main').append(html)
    $('#message_content').val('')
    $("#new_message")[0].reset();
    $('.all__chat__main').animate({ scrollTop: $('.all__chat__main')[0].scrollHeight });
  })
  .fail(function(){
    alert('error');
  })
  .always(function(data){
    $('.all__chat__footer__class__send').prop('disabled', false);
  })
})
});


$(function() {

  var buildMessageHTML = function(message) {
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    if (content && img) {
      //data-idが反映されるようにしている
      var html = '<div class="all__chat__main__class" data-id=' + message.id + '>' +
        '<div class="all__chat__main__class__name">' +
          '<div class="all__chat__main__class__name__group">' +
            message.user_name +
          '</div>' +
          '<div class="all__chat__main__class__name__info">' +
          message.date +
          '</div>' +
        '</div>' +
        '<div class="all__chat__main__class__message">' +
          '<p class="lower-message__content">' +
            content +
          '</p>' +
          '<img src="' + img + '" class="all__chat__main__class__message" >' +
        '</div>' +
      '</div>'
    } else if (content) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="all__chat__main__class" data-id=' + message.id + '>' +
        '<div class="all__chat__main__class__name">' +
          '<div class="all__chat__main__class__name__group">' +
            message.user_name +
          '</div>' +
          '<div class="all__chat__main__class__name__info">' +
            message.date +
          '</div>' +
        '</div>' +
        '<div class="all__chat__main__class__message">' +
          '<p class="lower-message__content">' +
            content +
          '</p>' +
        '</div>' +
      '</div>'
    } else if (img) {
      //同様に、data-idが反映されるようにしている
      var html = '<div class="all__chat__main__class" data-id=' + message.id + '>' +
        '<div class="all__chat__main__class__name">' +
          '<div class="all__chat__main__class__name__group">' +
            message.user_name +
          '</div>' +
          '<div class="all__chat__main__class__name__info">' +
            message.date +
          '</div>' +
        '</div>' +
        '<div class="all__chat__main__class__message">' +
          '<img src="' + img + '" class="all__chat__main__class__message" >' +
        '</div>' +
      '</div>'
    };
    return html;
  };

var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $('.message:last').data('message-id');
  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: 'api/messages#index {:format=>"json"}',
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'get',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  .done(function(messages) {
    var insertHTML = '';
    messages.forEach(function(message){
      insertHTML = buildHTML(message);
      $('.all__chat__main').append(insertHTML);
    $('.all__chat__main').animate({ scrollTop: $('.all__chat__main')[0].scrollHeight });
  })
})

  .fail(function() {
    alert("自動更新に失敗しました")
  })
}
setInterval(reloadMessages, 5000);
});
