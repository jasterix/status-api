class CreateTiles < ActiveRecord::Migration[5.2]
  def change
    create_table :tiles do |t|
      t.integer :board_id
      t.string :status_code
      t.string :status_description
      t.string :img_url

      t.timestamps
    end
  end
end
