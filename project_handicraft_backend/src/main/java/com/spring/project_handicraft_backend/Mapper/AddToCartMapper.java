package com.spring.project_handicraft_backend.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.spring.project_handicraft_backend.DTO.AddToCartDTO;
import com.spring.project_handicraft_backend.Entity.AddToCart;

@Mapper(componentModel = "spring")
public interface AddToCartMapper {
	
	AddToCartDTO toDTO(AddToCart entity);
	
	@Mapping(target = "id", ignore = true)
	@Mapping(target = "buyerId", ignore = true)
	@Mapping(target = "quantity", ignore = true)
	AddToCart toEntity(AddToCartDTO dto);
}
