package com.example.server.controller;

import com.example.server.model.*;
import com.example.server.model.persistenta.PersistentaFlorarie;
import com.example.server.model.persistenta.PersistentaUser;
import com.example.server.utils.EmailSenderService;
import com.example.server.utils.MessageDecorator;
import com.example.server.utils.WhatsAppMessageSender;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Data
@RestController
@CrossOrigin("*")
public class AdminController{

    @Autowired
    private EmailSenderService emailSenderService;

    @Autowired
    private PersistentaFlorarie persistentaFlorarie;

    @Autowired
    private PersistentaUser persistentaUser;

    @Autowired
    private JavaMailSender javaMailSender;

    private MessageDecorator messageDecorator;


    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) throws Exception {
        System.out.println("hellooooooo");
        String username = user.getUsername();
        if(username!=null) {
            User u = persistentaUser.searchUser(username);
            if(u!=null) {
                throw new Exception("User with username " + username + " already exists!");
            }
        }
        Florarie florarie = new Florarie();
        System.out.println(user.getUsername());
        System.out.println(user.getPassword());
        System.out.println(user.getFlorarie().getDenumire());
        florarie.setDenumire(user.getFlorarie().getDenumire());
        persistentaFlorarie.addFlorarie(florarie);
        return persistentaUser.addUser(user);
    }

    @DeleteMapping("/deleteUser/{username}")
    public ResponseEntity<Void> deleteUser(@PathVariable String username) {
        try {
            persistentaUser.deleteUser(username);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateUser/{username}")
    public ResponseEntity<User> updateUser(@RequestBody User user) throws Exception {
        User u = persistentaUser.searchUser(user.getUsername());
        if(u!=null) {
            persistentaUser.updateUser(user);
            return new ResponseEntity<User>(user, HttpStatus.OK);
        } else{
            throw new Exception("User with username " + user.getUsername() + " doesn't exists!");
        }

    }

    @GetMapping("/searchUser/{username}")
    public ResponseEntity<List<User>> searchUser(@PathVariable String username) throws Exception {
        User u  = persistentaUser.searchUser(username);
        List<User> user = new ArrayList<>();

        if(u!=null) {
            user.add(u);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }  else{
            throw new Exception("User with username " + username + " doesn't exists!");
        }
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAll() {
        return new ResponseEntity<>(persistentaUser.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/filteredUsers")
    public  ResponseEntity<List<User>> filterUsers() {
        List<User> users =new ArrayList<>();
        for(User u:persistentaUser.getUsers()) {
            if(u.getRole().equals("employee")) {
                users.add(u);
            }
        }
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("/sendNotifications")
    public ResponseEntity<Void> sendNotifications() {

        messageDecorator = new MessageDecorator(new EmailSenderService(this.javaMailSender));
        messageDecorator.sendMessage();
        messageDecorator = new MessageDecorator(new WhatsAppMessageSender());
        messageDecorator.sendMessage();
        System.out.println("notification!!!");
        return ResponseEntity.ok().build();
    }

}
