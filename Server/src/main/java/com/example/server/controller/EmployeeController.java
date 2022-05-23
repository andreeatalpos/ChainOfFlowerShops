package com.example.server.controller;

import com.example.server.model.FloareFlorarie;
import com.example.server.utils.ReportsFactory;
import com.example.server.model.persistenta.PersistentaFlorarie;
import com.example.server.model.persistenta.PersistentaUser;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Data
@RestController
@CrossOrigin("*")
public class EmployeeController {

    @Autowired
    private PersistentaFlorarie persistentaFlorarie;

    @Autowired
    private PersistentaUser persistentaUser;

    private ReportsFactory reportsFactory;

    @GetMapping("/allFlowers/{florarie}")
    public ResponseEntity<List<FloareFlorarie>> getAll(@PathVariable String florarie) {
        return new ResponseEntity<>(persistentaFlorarie.getFlori(florarie), HttpStatus.OK);
    }

    @GetMapping("/searchFlower/{denumire}")
    public ResponseEntity<List<FloareFlorarie>> searchFlower(@PathVariable String denumire) {
        return new ResponseEntity<>(persistentaFlorarie.searchByDenumire(denumire), HttpStatus.OK);
    }

    @PostMapping("/addFlower/{florarie}")
    public ResponseEntity<FloareFlorarie> addFlower(@RequestBody FloareFlorarie floare, @PathVariable String florarie) throws Exception {
        String f = floare.getDenumire();
        if (f != null) {
            FloareFlorarie current = persistentaFlorarie.searchFloare(floare.getDenumire(), floare.getCuloare(), florarie);
            if (current != null) {
                throw new Exception("This flower already exists in the shop!");
            }
        }
        return new ResponseEntity<>(persistentaFlorarie.addFloare(florarie, floare), HttpStatus.OK);
    }

    @DeleteMapping("/deleteFlower/{florarie}/{denumire}/{culoare}")
    public ResponseEntity<Void> deleteFlower(@PathVariable String florarie, @PathVariable String denumire, @PathVariable String culoare) {
        try {
            persistentaFlorarie.deleteFloare(denumire, culoare, florarie);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/updateFlower/{florarie}/{denumire}/{culoare}")
    public ResponseEntity<FloareFlorarie> updateFlower(@RequestBody FloareFlorarie floare, @PathVariable String florarie, @PathVariable String denumire, @PathVariable String culoare) throws Exception {
        FloareFlorarie f = persistentaFlorarie.searchFloare(denumire, culoare, florarie);
        if (f != null) {
            persistentaFlorarie.updateFloare(floare, florarie);
            return new ResponseEntity<FloareFlorarie>(f, HttpStatus.OK);
        } else {
            throw new Exception("Flower " + denumire + " doesn't exists!");
        }
    }

    @GetMapping("/filterByColor/{florarie}/{culoare}")
    public ResponseEntity<List<FloareFlorarie>> filterByColor(@PathVariable String florarie, @PathVariable String culoare) {
        List<FloareFlorarie> flori = new ArrayList<>();
        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            if (f.getCuloare().equals(culoare)) {
                flori.add(f);
            }
        }

        return new ResponseEntity<>(flori, HttpStatus.OK);
    }

    @GetMapping("/filterByPret/{florarie}/{pret}")
    public ResponseEntity<List<FloareFlorarie>> filterByPret(@PathVariable String florarie, @PathVariable Float pret) {
        List<FloareFlorarie> flori = new ArrayList<>();
        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            if (Objects.equals(f.getPret(), pret)) {
                flori.add(f);
            }
        }
        return new ResponseEntity<>(flori, HttpStatus.OK);
    }

    @GetMapping("/filterByCantitate/{florarie}/{cantitate}")
    public ResponseEntity<List<FloareFlorarie>> filterByCantitate(@PathVariable String florarie, @PathVariable Integer cantitate) {
        List<FloareFlorarie> flori = new ArrayList<>();
        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            if (Objects.equals(f.getCantitate(), cantitate)) {
                flori.add(f);
            }
        }
        return new ResponseEntity<>(flori, HttpStatus.OK);
    }

    @GetMapping("/filterByDisponibilitate/{florarie}/{disponibilitate}")
    public ResponseEntity<List<FloareFlorarie>> filterByDisponibilitate(@PathVariable String florarie, @PathVariable Boolean disponibilitate) {
        List<FloareFlorarie> flori = new ArrayList<>();
        for (FloareFlorarie f : persistentaFlorarie.getFlori(florarie)) {
            if (Objects.equals(f.getDisponibilitate(), disponibilitate)) {
                flori.add(f);
            }
        }
        return new ResponseEntity<>(flori, HttpStatus.OK);
    }

    @GetMapping("/reports/{florarie}/{type}")
    public ResponseEntity<Void> createReport(@PathVariable String florarie, @PathVariable String type) throws Exception {
        System.out.println("creare raport");
        this.reportsFactory = new ReportsFactory(this.persistentaFlorarie);
        this.reportsFactory.createReport(type, florarie);
        return ResponseEntity.ok().build();
    }


}
