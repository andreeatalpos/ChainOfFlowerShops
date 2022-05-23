package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class FloareFlorarie extends Floare{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id", nullable=false, insertable = false, updatable = false)
    private Long id;
    private String denumire;
    private String culoare;

    private Float pret;
    private Integer cantitate;
    private Boolean disponibilitate;


    public FloareFlorarie(String denumire, String culoare, Float pret, Integer cantitate, Boolean disponibilitate) {
        this.denumire = denumire;
        this.culoare = culoare;
        this.cantitate = cantitate;
        this.pret = pret;
        this.disponibilitate = disponibilitate;
    }

    public void setCantitate(String cantitate){
        this.cantitate = Integer.parseInt(cantitate);
    }
    public void setDisponibilitate(String disponibilitate) {
        this.disponibilitate = Boolean.parseBoolean(disponibilitate);
    }
    public void setPret(String pret) {
        this.pret = Float.parseFloat(pret);
    }

}
