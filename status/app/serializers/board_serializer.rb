class BoardSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :user
  has_many :tiles
  attributes :created_at, :username_id, :name, :seach
end
