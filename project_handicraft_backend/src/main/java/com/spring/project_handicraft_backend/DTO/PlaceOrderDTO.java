package com.spring.project_handicraft_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlaceOrderDTO {

	 long id;
	 long orderId;
	 long sellerId;
	 long buyerId;
	 long productId;
	 int quantity;
	 long price;
	 String status;
	 String paymentStatus;
}
