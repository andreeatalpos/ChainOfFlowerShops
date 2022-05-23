package com.example.server.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor

public class Floare {

    private Long id;

    private String denumire;
    private String culoare;

}
