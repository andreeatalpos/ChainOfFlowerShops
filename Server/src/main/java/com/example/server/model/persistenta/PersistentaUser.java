package com.example.server.model.persistenta;

import com.example.server.model.User;
import com.example.server.model.repository.FlorarieRepository;
import com.example.server.model.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Service
public class PersistentaUser {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FlorarieRepository florarieRepository;

    public List<User> getUsers() {
        List<User> users = userRepository.findAll();
        Comparator<User> compareByRole = Comparator
                .comparing(User::getRole)
                .thenComparing(User::getUsername);
        List<User> sorted = users.stream()
                .sorted(compareByRole)
                .collect(Collectors.toList());
        return sorted;
    }

    public User addUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(String username) {
        User user = userRepository.findByUsername(username);
        userRepository.delete(user);
    }

    public User updateUser(User user) {
        deleteUser(user.getUsername());
        return userRepository.save(user);
    }

    public User searchUser(String username) {
        return userRepository.findByUsername(username);
    }

}
