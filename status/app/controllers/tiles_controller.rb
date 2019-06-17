class TilesController < ApplicationController
  before_action :get_params, only: [:show]
  def index
    render json: TileSerializer.new(Tile.all)
  end

  def show
    options = {
      include: [:board_id, :status_code, :img_url, :status_description]
    }

    render json: TileSerializer.new(Tile.find(params[:id]), options)
  end

  def get_params
    params.require(:tile).permit!
  end
end
