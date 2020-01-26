# chat-spaceのDB設計
## usersテーブル
|column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :groups,through: :group_users
- has_many :messages
- has_many :group_users

## groupsテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :users, through: :group_users
- has_many :messages
- has_many :group_users

## group_usersテーブル
|column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belomgs_to :group

## messagesテーブル
|column|Type|Options|
|------|----|-------|
|text|text||
|photo|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group