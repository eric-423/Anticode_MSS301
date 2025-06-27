package com.example.cinemaservice.controller;

import com.example.cinemaservice.entity.ConcessionProduct;
import com.example.cinemaservice.payload.ResponseData;
import com.example.cinemaservice.service.Imp.ConcessionProductServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/concession-products")

public class ConcessionProductController {

    @Autowired
    private ConcessionProductServiceImp concessionProductServiceImp;

    @GetMapping
    public ResponseEntity<?> getAllConcessionProducts(@RequestParam(required = false, defaultValue = "0") int page,
                                                   @RequestParam(required = false, defaultValue = "10") int size) {
        ResponseData responseData = new ResponseData();
        responseData.setData(concessionProductServiceImp.getAll(page, size));

        return ResponseEntity.ok(responseData);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getConcessionProductById(@PathVariable Integer id) {

        ResponseData responseData = new ResponseData();
        responseData.setData(concessionProductServiceImp.getById(id));

        return ResponseEntity.ok(responseData);
    }

    @PostMapping
    public ConcessionProduct createConcessionProduct(@RequestBody ConcessionProduct concessionProduct) {
        return concessionProductServiceImp.create(concessionProduct);
    }

    @PutMapping("/{id}")
    public ConcessionProduct updateConcessionProduct(@PathVariable Integer id, @RequestBody ConcessionProduct concessionProduct) {
        return concessionProductServiceImp.update(id, concessionProduct);
    }

    @DeleteMapping("/{id}")
    public void deleteConcessionProduct(@PathVariable Integer id) {
        concessionProductServiceImp.delete(id);
    }

}
