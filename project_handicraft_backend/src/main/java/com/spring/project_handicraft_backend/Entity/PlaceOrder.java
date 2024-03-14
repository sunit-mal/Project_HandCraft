package com.spring.project_handicraft_backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table
public class PlaceOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private long orderId;
	@Column
	private long sellerId;
	@Column
	private long buyerId;
	@Column
	private long productId;
	@Column
	private int quantity;
	@Column
	private long price;
	@Column
	private String status;
	@Column
	private String paymentStatus;
}
