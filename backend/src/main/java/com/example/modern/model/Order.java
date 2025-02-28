package com.example.modern.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "orders") // Rename the table to avoid SQL conflicts
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long propertyId;
    private Long customerId;
}