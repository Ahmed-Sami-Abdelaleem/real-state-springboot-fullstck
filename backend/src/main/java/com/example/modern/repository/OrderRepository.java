package com.example.modern.repository;

import com.example.modern.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository // Explicitly mark this as a repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}