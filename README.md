# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name  |string|index:true,null:false,unique:true|
|emaile|string|null:false,unique:true|
|password|string|null:false|

### Association
- has_many :groups,through:mambers
- has_many :messages
- has_many :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name  |string|null:false|

### Association
- has_many :users,through: members
- has_many :messages
- has_many :memebers

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|      |
|-------|----|------|
|image|text|        |
|-------|----|------|
|group-id|integer|null:false,foreighn_key:true|
|-------|----|------|
|user-id|integer|null:false,foreign_key:true|
|-------|----|------|
### Association
- belongs_to :group
- belongs_to :member
