package com.spring.project_handicraft_backend.Exception;

import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
public class AppException extends RuntimeException {

	private final HttpStatus status;

	public AppException(String message, HttpStatus status) {
		super(message);
		this.status = status;
	}

	public HttpStatus getCode() {
		return status;
	}

}