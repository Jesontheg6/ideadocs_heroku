module Api::V1
  class IdeasController < ApplicationController
    before_action :authenticate_user!
    before_action :set_board

    def index
      @ideas = @board.ideas.order created_at: :asc
      json_res 'success', true, { ideas: parse_json(@ideas) }, :ok
    end

    def create
      idea_params.merge user_id: current_user.id
      @idea = @board.ideas.create! idea_params
      if @idea.save
        ActionCable.server.broadcast :ideas, event: :created, idea: @idea
        json_res 'created', true, { idea: parse_json(@idea) }, :created
      else
        json_res 'error', false, { error: @idea.errors }, :bad_request
      end
    end

    def update
      @idea = Idea.find params[:id]
      if @idea
        @idea.update_attributes idea_params
        ActionCable.server.broadcast :ideas, event: :updated, idea: @idea
        json_res 'updated', true, { idea: parse_json(@idea) }, :ok
      else
        json_res 'error', false, { error: 'idea not found' }, :not_found
      end
    end

    def destroy
      @idea = Idea.find params[:id]

      if @idea.destroy
        ActionCable.server.broadcast :ideas, event: :deleted, idea: @idea
        head :no_content
      else
        json_res 'error', false, { error: @idea.errors }, :unprocessable_entity
      end
    end

    private

    def idea_params
      params.permit(:title, :body, :color)
    end

    def set_board
      @board = Board.find_by title: params[:board_slug].gsub!('-', ' ')
    end
  end
end
