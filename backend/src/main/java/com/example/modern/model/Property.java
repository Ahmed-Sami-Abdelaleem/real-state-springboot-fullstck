package com.example.modern.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String location;
    private int roomNumber;
    private int bathroomNumber;
    private int floor;
}
