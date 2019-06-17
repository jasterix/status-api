class User < ApplicationRecord
  has_many :boards
  has_many :tiles, through: :boards
end
