package com.spring.project_handicraft_backend.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.project_handicraft_backend.Entity.ProductDetails;

@Repository
public interface ProductUpdate extends JpaRepository<ProductDetails, Long> {
	List<ProductDetails> getDetailsByUserID(long userID);
}
