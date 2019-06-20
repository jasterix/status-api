class AddColumntoBoards < ActiveRecord::Migration[5.2]
  def change
    add_column :boards, :codes, :string, array: true, default: '{}'
  end
end
