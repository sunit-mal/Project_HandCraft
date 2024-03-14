package com.spring.project_handicraft_backend.Config;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.spring.project_handicraft_backend.DTO.ErrorDto;
import com.spring.project_handicraft_backend.Exception.AppException;

@RestControllerAdvice
public class RestExceptionHandler {
	
	@ExceptionHandler(value = {AppException.class})
	@ResponseBody
	public ResponseEntity<ErrorDto> handlerException(AppException ex){
		return ResponseEntity.status(ex.getCode())
				.body(ErrorDto.builder().massage(ex.getMessage()).build());
	}
}
