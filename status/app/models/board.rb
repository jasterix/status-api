class Board < ApplicationRecord
  validates :name, uniqueness: true  
  has_many :tiles
end
