json.array! @users do |user|
  json.id user.id
  json.name user.name
end
#複数のユーザーが格納された配列
