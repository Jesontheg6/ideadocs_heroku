module Api::V1
  class IdeasController < ApplicationController
    before_action :authenticate_user!
    before_action :set_board

    def index
      @ideas = @board.ideas.order created_at: :asc
      json_res 'success', true, { ideas: parse_json(@ideas) }, :ok
    end

    def show
      @idea = @board.ideas.find params[:id]
      if @idea
        json_res 'success', true, { idea: parse_json(@idea) }, :ok
      else
        json_res 'error', false, { error: @idea.errors }, :not_found
      end
    end

    def create
      idea_params.merge user_id: current_user.id
      @idea = Idea.new idea_params
      @idea.user = current_user
      @idea.board = @board
      if @idea.save
        IdeasChannel.broadcast_to @idea, parse_json(@idea)
        json_res 'created', true, { idea: parse_json(@idea) }, :created
      else
        json_res 'error', false, { error: @idea.errors }, :bad_request
      end
    end

    def update
      @idea = Idea.find params[:id]
      if @idea
        @idea.update_attributes idea_params
        IdeasChannel.broadcast_to @idea, parse_json(@idea)
        json_res 'updated', true, { idea: parse_json(@idea) }, :ok
      else
        json_res 'error', false, { error: 'idea not found' }, :not_found
      end
    end

    def destroy
      @idea = Idea.find params[:id]

      if @idea.destroy
        IdeasChannel.broadcast_to @idea, parse_json(@idea)
        head :no_content
      else
        json_res 'error', false, { error: @idea.errors }, :unprocessable_entity
      end
    end

    private

    def idea_params
      params.permit :title, :body, :color
    end

    def set_board
      @board = Board.find_by title: params[:board_slug].gsub!('-', ' ')
    end
  end
end
