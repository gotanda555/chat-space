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
})