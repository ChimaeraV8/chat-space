# chat-spaceのDB設計
## usersテーブル
|column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :groups
- has_many :messages
- has_many :photos

## groupsテーブル
|column|Type|Options|
|------|----|-------|
|name|string|null: false|
|group_user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users, through: :group_users
- has_many :messages

## group_usersテーブル
|column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belomgs_to :group

## messagesテーブル
|column|Type|Options|
|------|----|-------|
|text|string|null: false|
|photo|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## photosテーブル
|column|Type|Options|
|------|----|-------|
|file|string|null: false|
|message_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :message