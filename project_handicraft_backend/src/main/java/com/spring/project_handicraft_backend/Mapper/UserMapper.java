package com.spring.project_handicraft_backend.Mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.spring.project_handicraft_backend.DTO.SignUpDto;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
	
//	@Mapping(target = "token", ignore = true)
	UserDto toUserDto(User user);
	
//	@Mapping(target = "id", ignore = true)
	@Mapping(target = "password", ignore = true)
	User signUpToUser(SignUpDto signUpDto);
	
}