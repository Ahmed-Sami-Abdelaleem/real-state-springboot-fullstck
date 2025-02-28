package com.example.modern.controller;

import com.example.modern.model.Property;
import com.example.modern.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/properties")
public class PropertyController {
    @Autowired
    private PropertyRepository propertyRepository;

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }
}
