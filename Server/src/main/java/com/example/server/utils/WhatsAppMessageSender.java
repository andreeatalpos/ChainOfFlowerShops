package com.example.server.utils;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class WhatsAppMessageSender implements MessageSender {

   public static final String ACCOUNT_SID = "AC6f8eb113e82ebe7138804f7cd7695665";
   public static final String AUTH_TOKEN = "c3fde06cc147719db0fb8683899b4fae";


   public String sendMessage() {
       Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
       Message message = Message.creator(
               new com.twilio.type.PhoneNumber("whatsapp:+40771750442"),
               new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
               "Your account details for your flower shop app were updated!")
           .create();
       return "Message sent successfully";
   }
}
