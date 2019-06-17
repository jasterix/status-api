class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :name
      t.integer :username_id
      t.string :search

      t.timestamps
    end
  end
end
