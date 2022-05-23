package com.example.server.controller;

import com.example.server.model.User;
import com.example.server.model.persistenta.PersistentaUser;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Data
@RestController
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private PersistentaUser persistentaUser;

    @PostMapping("/login")
    public User loginUser(@RequestBody User user) throws Exception {
        String tempUsername = user.getUsername();
        String tempPassword = user.getPassword();
        String tempRole = user.getRole();

        User userObj = null;
        if(tempUsername != null && tempPassword != null && tempRole !=null) {
            userObj = persistentaUser.searchUser(user.getUsername());
            if(!tempPassword.equals(userObj.getPassword())) {
                userObj=null;
            }
        }
        if(userObj == null){
            throw new Exception("User " + tempUsername + " does not exists. Bad credentials!");
        }
        return userObj;
    }

}
