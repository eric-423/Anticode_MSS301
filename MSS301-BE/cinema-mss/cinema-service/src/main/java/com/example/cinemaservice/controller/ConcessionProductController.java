package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.ConcessionProduct;
import com.example.cinemaservice.service.Imp.ConcessionProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concession-products")
public class ConcessionProductController {

    @Autowired
    private ConcessionProductServiceImp concessionProductServiceImp;

    @GetMapping
    public List<ConcessionProduct> getAllConcessionProducts() {
        return concessionProductServiceImp.getAll();
    }

    @GetMapping("/{id}")
    public ConcessionProduct getConcessionProductById(Integer id) {
        return concessionProductServiceImp.getById(id)
                .orElseThrow(() -> new RuntimeException("Concession Product not found with id: " + id));
    }

    @PostMapping
    public ConcessionProduct createConcessionProduct(ConcessionProduct concessionProduct) {
        return concessionProductServiceImp.create(concessionProduct);
    }

    @PutMapping("/{id}")
    public ConcessionProduct updateConcessionProduct(Integer id, ConcessionProduct concessionProduct) {
        return concessionProductServiceImp.update(id, concessionProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteConcessionProduct(Integer id) {
        concessionProductServiceImp.delete(id);
    }

}
