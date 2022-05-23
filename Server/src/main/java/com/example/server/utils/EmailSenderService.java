package com.example.server.utils;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Service
public class EmailSenderService implements MessageSender {


    private JavaMailSender javaMailSender;

    public EmailSenderService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public String sendMessage() {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom("tandreea960@gmail.com");
        message.setTo("tandreea960@gmail.com");
        message.setSubject("New update!");
        message.setText("Your account details for your flower shop app were updated!");

        javaMailSender.send(message);

        return "Mail sent successfully";
    }


}
