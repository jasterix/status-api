class BoardsController < ApplicationController
  before_action :get_params, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    render json: BoardSerializer.new(Board.all)
    
  end

  def show
    # options = {
    # include: [:name, :urls]
    # }
    # render json: BoardSerializer.new(Board.find(params[:id]),options)
    render json: BoardSerializer.new(Board.find(params[:id]))
  end

  def update
    board = BoardSerializer.new(Board.find(get_params[:id]))
    board.update(get_params)
    render json: BoardSerializer.new(Board.find(get_params[:id]))
  end

  def create

      # Use strong parameters instead
      # board = Board.new(get_params)
      #
      # format.html { redirect_to boards, notice: 'User1 was successfully created.' }
      # format.json { render :show, status: :created }
      # format.json {status: :created }

      # respond_to do |format|
      #
      #     format.html { render :index }
      #     format.json { render json: board.errors, status: :unprocessable_entity }

      # end
      # debugger
    @board = Board.create(get_params)

    render json: @board, status: :ok
    end


  private

  def get_params
    # params.require(:board).permit(:name, :id, :urls, :codes)
    params.permit(:board)
  end
end
