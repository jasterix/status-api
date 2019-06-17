class UserSerializer
  include FastJsonapi::ObjectSerializer
  has_many :boards
  has_many :tiles, through: :boards
  attributes :username
end
