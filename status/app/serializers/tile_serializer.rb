class TileSerializer
  include FastJsonapi::ObjectSerializer
  belongs_to :board
  attributes :board_id, :status_code, :status_description, :img_url
end
