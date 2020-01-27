class Message < ApplicationRecord
  belongs_to :group
  belongs_to :user

  validates :text, presence: true, unless: :photo?
  mount_uploader :photo, PhotoUploader
end
