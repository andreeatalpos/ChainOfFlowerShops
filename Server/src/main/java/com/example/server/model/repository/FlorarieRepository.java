package com.example.server.model.repository;

import com.example.server.model.Florarie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FlorarieRepository extends CrudRepository<Florarie, Long> {
    Florarie findByDenumire(String denumire);
}
