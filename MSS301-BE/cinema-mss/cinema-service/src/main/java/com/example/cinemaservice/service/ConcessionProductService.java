package com.example.cinemaservice.service;

import com.example.cinemaservice.dtos.ConcessionProductDTO;
import com.example.cinemaservice.dtos.MovieDTO;
import com.example.cinemaservice.entity.ConcessionProduct;
import com.example.cinemaservice.repository.ConcessionProductRepository;
import com.example.cinemaservice.service.Imp.ConcessionProductServiceImp;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ConcessionProductService implements ConcessionProductServiceImp {
    private final ConcessionProductRepository repository;

    public ConcessionProductService(ConcessionProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public ConcessionProduct create(ConcessionProduct entity) {
        return repository.save(entity);
    }

    @Override
    public ConcessionProductDTO getById(Integer id) {
        Optional<ConcessionProduct> optionalProduct = repository.findById(id);
        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Concession Product not found with id: " + id);
        }
        ConcessionProduct product = optionalProduct.get();
        ConcessionProductDTO dto = convertToDTO(product);
        return dto;
    }

    @Override
    public Page<ConcessionProductDTO> getAll(int page, int size) {
        List<ConcessionProduct> products = repository.findAll();
        List<ConcessionProductDTO> concessionProductDTOS = new ArrayList<>();

        for(ConcessionProduct product : products) {
            concessionProductDTOS.add(convertToDTO(product));
        }


        int totalElements = concessionProductDTOS.size();
        int start = Math.min(page * size, totalElements);
        int end = Math.min(start + size, totalElements);
        List<ConcessionProductDTO> subList = concessionProductDTOS.subList(start, end);

        Page<ConcessionProductDTO> result = new PageImpl<>(subList, PageRequest.of(page, size), totalElements);


        return result;
    }

    private ConcessionProductDTO convertToDTO(ConcessionProduct product) {
        ConcessionProductDTO dto = new ConcessionProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setProductImageUrl(product.getProductImageUrl());
        dto.setSize(product.getSize());
        return dto;
    }

    @Override
    public ConcessionProduct update(Integer id, ConcessionProduct entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("ConcessionProduct not found: " + id);
        }
        entity.setId(id);
        return repository.save(entity);
    }

    @Override
    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
