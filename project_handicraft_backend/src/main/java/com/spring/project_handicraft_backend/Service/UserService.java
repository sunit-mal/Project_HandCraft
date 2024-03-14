package com.spring.project_handicraft_backend.Service;

import java.nio.CharBuffer;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.spring.project_handicraft_backend.Config.UserAuthProvider;
import com.spring.project_handicraft_backend.DAO.UserRepository;
import com.spring.project_handicraft_backend.DTO.CredentialsDto;
import com.spring.project_handicraft_backend.DTO.SignUpDto;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Exception.AppException;
import com.spring.project_handicraft_backend.Mapper.UserMapper;
import com.spring.project_handicraft_backend.Entity.User;

import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


@RequiredArgsConstructor
@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public UserDto findByEmail(String email) {
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		return userMapper.toUserDto(user);
	}

	public UserDto UserLogin(CredentialsDto credentialsDto) {
		User user = userRepository.findByEmail(credentialsDto.getEmail())
				.orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
		if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {			
			return userMapper.toUserDto(user);
		}
		throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
	}

	public UserDto register(SignUpDto signUpDto) {
		Optional<User> optionalUser = userRepository.findByEmail(signUpDto.getEmail());
		if (optionalUser.isPresent()) {
			throw new AppException("Email already exists", HttpStatus.BAD_REQUEST);
		}
		User user = userMapper.signUpToUser(signUpDto);
		user.setPassword(passwordEncoder.encode(CharBuffer.wrap(signUpDto.getPassword())));
		User savedUser = userRepository.save(user);
		return userMapper.toUserDto(savedUser);
	}
	
	public UserDto activeUserDetailsCollect() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			return (UserDto) authentication.getPrincipal();			
		}
		return null;
		
	}
}
