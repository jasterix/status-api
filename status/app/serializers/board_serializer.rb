class BoardSerializer
  include FastJsonapi::ObjectSerializer

  has_many :tiles
  attributes :created_at, :name, :urls, :codes
end
