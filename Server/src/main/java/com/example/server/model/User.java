package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Getter
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String password;
    private String role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "florarie_id", referencedColumnName = "id")
    private Florarie florarie;

    public User(String username, String password, String role, Florarie florarie) {
        this.username = username;
        this.password  = password;
        this.role = role;
        this.florarie = florarie;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setFlorarie(Florarie florarie) {
        this.florarie = florarie;
    }
}
