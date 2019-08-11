class BoardsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_channel_#{params[:slug]}"
  end

  def unsubscribed
    stop_all_streams
  end
end
