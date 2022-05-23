package com.example.server.utils;


import com.example.server.model.persistenta.PersistentaFlorarie;
import com.example.server.model.persistenta.PersistentaUser;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;


@Service
public class InitializationService {

    private PersistentaUser persistentaUser;
    private PersistentaFlorarie persistentaFlorarie;

    protected InitializationService(PersistentaUser persistentaUser, PersistentaFlorarie persistentaFlorarie) {
        this.persistentaUser = persistentaUser;
        this.persistentaFlorarie = persistentaFlorarie;
    }

    @Bean
    public void initializeData() {

      //  LoginView loginView = new LoginView(adminView, employeeView);

      //  LoginController loginController = new LoginController(persistentaUser);

    }

}
