module Api::V1
  class BoardsController < ApplicationController
    before_action :current_user

    def index
      @boards = Board.where user_id: @current_user_id
      json_res 'success', true, { boards: parse_json(@boards) }, :ok
    end

    def show
      @board = Board.find_by title: params[:slug].gsub!('-', ' '), user_id: @current_user_id
      if @board
        json_res 'success', true, { board: parse_json(@board) }, :ok
      else
        json_res 'error', false, { error: @board.errors }, :not_found
      end
    end

    def create
      @board = Board.new board_params
      @board.user_id = @current_user_id
      @board.slug = params[:title].downcase.gsub! ' ', '-'
      if @board.save
        BoardsChannel.broadcast_to @board, parse_json(@board)
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
        BoardsChannel.broadcast_to @board, parse_json(@board)
        json_res 'updated', true, { board: parse_json(@board) }, :ok
      else
        json_res 'error', false, { error: 'board not found' }, :not_found
      end
    end

    def destroy
      @board = Board.find_by title: params[:slug].gsub!('-', ' ')
      if @board.destroy
        BoardsChannel.broadcast_to @board, parse_json(@board)
        head :no_content
      else
        json_res 'error', false, { error: @board.errors }, :unprocessable_entity
      end
    end

    private

    def board_params
      params.permit :title, :slug, :id
    end
  end
end
