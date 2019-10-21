json.(@message, :content, :image)
json.content  @message.content
json.date @message.created_at.strftime("%Y-%m-%d %H:%M")
json.user_id  @message.user.id
json.user_name @message.user.name
json.image  @message.image.url
json.group_id  @message.group.id
#idもデータとして渡す
json.id @message.id

