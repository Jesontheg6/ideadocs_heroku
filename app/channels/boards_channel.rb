class BoardsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_channel_#{params[:id]}"
  end

  def received(data)
    BoardsChannel.broadcast_to("board_channel_#{params[:id]}", title: @board.title)
  end

  def unsubscribed
    stop_all_streams
  end
end
