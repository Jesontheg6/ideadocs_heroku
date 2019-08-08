module Api::V1
  class BoardsController < ApplicationController
    before_action :authenticate_user!

    def index
      @board = Board.all
      render json: @board
    end

    def create
      @board = Board.create(board_params)
      if @board.save
        ActionCable.server.broadcast 'boards', event: :created, board: @board
        head :ok
        render json: @board
      end
    end


    def update
      @board = Board.find(params[:id])
      @board.update_attributes(board_params)

      ActionCable.server.broadcast 'boards', event: :updated, board: @board

      render json: @board
    end

    private

    def board_params
      params.require(:board).permit(:boardtitle)
    end
  end
end
