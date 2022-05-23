package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Florarie{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable=false)
    private Long id;

    private String denumire;

    @OneToMany(cascade = CascadeType.MERGE, fetch= FetchType.EAGER, orphanRemoval = true)
    private List<FloareFlorarie> flori;

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public void setFlori(List<FloareFlorarie> flori){
        this.flori = flori;
    }




}
