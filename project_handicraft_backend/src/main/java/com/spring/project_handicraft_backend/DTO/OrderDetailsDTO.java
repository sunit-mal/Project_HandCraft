package com.spring.project_handicraft_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailsDTO {
	 long id;
	
	 String address;
	 String city;
	 String state;
	 String country;
	 String postalCode;
	 String phoneNumber;
	 String dateAndTime;
	 String status;
	 long totalPrice;
	 String paymentMode;
}
