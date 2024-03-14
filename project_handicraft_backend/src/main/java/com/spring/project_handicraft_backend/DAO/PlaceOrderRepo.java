package com.spring.project_handicraft_backend.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.project_handicraft_backend.Entity.PlaceOrder;

@Repository
public interface PlaceOrderRepo extends JpaRepository<PlaceOrder, Long> {
	List<PlaceOrder> findByOrderId(long orderId);
	List<PlaceOrder> findByBuyerId(long buyerId);
	List<PlaceOrder> findBySellerId(long sellerId);
}
