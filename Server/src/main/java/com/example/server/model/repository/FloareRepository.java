package com.example.server.model.repository;

import com.example.server.model.FloareFlorarie;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface FloareRepository extends CrudRepository<FloareFlorarie, Long> {
    FloareFlorarie findByDenumireAndCuloare(String denumire, String culoare);
    List<FloareFlorarie> findAllByDenumire(String denumire);
}
