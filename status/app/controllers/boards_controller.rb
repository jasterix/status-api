class BoardsController < ApplicationController
  before_action :get_params, only: [:show]

  def index
    render json: BoardSerializer.new(Board.all)
  end

  def show
    options = {
    include: [:name, :username_id, :search_term]
  }
    render json: BoardSerializer.new(Board.find(params[:id]),options)
  end


  private

  def get_params
    params.require(:board).permit!
  end
end
