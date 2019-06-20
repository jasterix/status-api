class RemoveSearchFromBoards < ActiveRecord::Migration[5.2]
  def change
    remove_column :boards, :search, :string
  end
end
