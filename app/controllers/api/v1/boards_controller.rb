module Api::V1
  class BoardsController < ApplicationController
    before_action :authenticate_user!

    def index
      @boards = current_user.boards
      json_res 'success', true, { boards: parse_json(@boards) }, :ok
    end

    def create
      @board = current_user.boards.create! board_params
      @board.slug = params[:title].downcase.gsub! ' ', '-'
      if @board.save
        ActionCable.server.broadcast "board_channel_#{params[:slug]}", parse_json(@board)
        json_res 'created', true, { board: parse_json(@board) }, :created
      else
        json_res 'error', false, { error: @board.errors }, :bad_request
      end
    end

    def update
      @board = Board.find_by title: params[:slug].gsub!('-', ' ')
      if @board
        @board.update_attributes board_params
        @board.slug = params[:title].downcase.gsub! ' ', '-'
        ActionCable.server.broadcast "board_channel_#{params[:slug]}", parse_json(@board)
        json_res 'updated', true, { board: parse_json(@board) }, :ok
      else
        json_res 'error', false, { error: 'board not found' }, :not_found
      end
    end

    private

    def board_params
      params.permit(:title, :slug)
    end
  end
end
