class BoardsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_channel_#{params[:id]}"
  end

  def unsubscribed
    stop_all_streams
  end
end
