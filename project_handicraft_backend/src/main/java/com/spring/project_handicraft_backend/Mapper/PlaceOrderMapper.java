package com.spring.project_handicraft_backend.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.spring.project_handicraft_backend.DTO.PlaceOrderDTO;
import com.spring.project_handicraft_backend.Entity.PlaceOrder;

@Mapper(componentModel = "spring")
public interface PlaceOrderMapper {
	
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "price", ignore = true)
	PlaceOrder toEntity(PlaceOrderDTO placeOrderDTO);
	
	PlaceOrderDTO toDTO(PlaceOrder placeOrder);
}
