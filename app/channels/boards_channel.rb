class BoardsChannel < ApplicationCable::Channel
  def subscribed
    @board = Board.find params[:id]
    stream_for @board
  end

  def unsubscribed
    stop_all_streams
  end
end
