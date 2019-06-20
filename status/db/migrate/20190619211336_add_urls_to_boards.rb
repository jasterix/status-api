class AddUrlsToBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :urls, :string, array: true, default: '{}'
  end
end
