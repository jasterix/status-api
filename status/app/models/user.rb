class User < ApplicationRecord
  
  has_many :tiles, through: :boards
end
