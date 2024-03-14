package com.spring.project_handicraft_backend.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.spring.project_handicraft_backend.DTO.AddressDTO;
import com.spring.project_handicraft_backend.Entity.AddressDetails;

@Mapper(componentModel = "spring")
public interface AdderssMapper {

	AddressDTO toaAddressDTO(AddressDetails addressDetails);
	
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "userId", ignore = true)
	AddressDetails toAddressDetails(AddressDTO addressDTO);
}
