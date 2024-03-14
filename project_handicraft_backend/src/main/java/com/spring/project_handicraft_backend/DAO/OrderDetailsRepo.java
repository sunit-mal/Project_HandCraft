package com.spring.project_handicraft_backend.DAO;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.project_handicraft_backend.Entity.OrderDetails;

public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

}
