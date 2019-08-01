class IdeasChannel < ApplicationCable::Channel
  def subscribed
    @ideas = Board.ideas
    stream_for @ideas
  end

  def unsubscribed
    stop_all_streams
  end
end
