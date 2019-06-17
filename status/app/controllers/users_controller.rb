class UsersController < ApplicationController
  # before_action :get_params, only: [:show, :create]

  def index
    render json: UserSerializer.new(User.all)
  end

  def show
    options = {
    include: [:username]
  }
    render json: UserSerializer.new(User.find(params[:id]),options)
  end


  private

  def get_params
    params.require(:user).permit(:username, :id)
  end

end
