class BoardSerializer
  include FastJsonapi::ObjectSerializer

  has_many :tiles
  attributes :name, :urls, :likes
end
