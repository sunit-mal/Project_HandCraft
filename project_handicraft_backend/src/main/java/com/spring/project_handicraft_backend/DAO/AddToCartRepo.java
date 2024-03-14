package com.spring.project_handicraft_backend.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.project_handicraft_backend.Entity.AddToCart;

@Repository
public interface AddToCartRepo extends JpaRepository<AddToCart, Long> {
	List<AddToCart> findByBuyerId(long buyerId);
	List<AddToCart> findBySellerId(long sellerId);
	AddToCart findByProductId(long productId);
}
