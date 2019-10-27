class BoardsController < ApplicationController
  before_action :get_params, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    render json: BoardSerializer.new(Board.all)

  end

  def show
    render json: BoardSerializer.new(Board.find(params[:id]))
  end

  def update
    board = Board.find(get_params[:id])
    board.update(likes: get_params[:likes])
    render json: BoardSerializer.new(board)
  end

  def create
    @board = Board.create(name: get_params[:name], urls: get_params[:urls])

    render json: @board, status: :ok
    end


  private

  def get_params
    params.permit!
  end
end
