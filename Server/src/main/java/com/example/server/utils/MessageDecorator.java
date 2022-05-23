package com.example.server.utils;

public class MessageDecorator implements MessageSender {

    protected MessageSender messageSender;
    public MessageDecorator(MessageSender messageSender) {
        this.messageSender = messageSender;
    }
    @Override
    public String sendMessage() {
        return messageSender.sendMessage();
    }
}
