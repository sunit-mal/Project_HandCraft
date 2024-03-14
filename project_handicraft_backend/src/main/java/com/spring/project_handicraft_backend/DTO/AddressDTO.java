package com.spring.project_handicraft_backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddressDTO {
	long id;
	String address;
	String city;
	String state;
	String country;
	String postalCode;
	String phoneNumber;
	long userId;
}
