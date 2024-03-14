package com.spring.project_handicraft_backend.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	private final UserAuthenticationEntryPoint userAuthenticationEntryPoint ;
	private final UserAuthProvider userAuthProvider;

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.exceptionHandling(handling -> handling.authenticationEntryPoint(userAuthenticationEntryPoint))
				.addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
				.csrf(csrf -> csrf.disable())
				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						(authorizeRequests -> authorizeRequests.requestMatchers(HttpMethod.GET, "/product/**").permitAll()
								.requestMatchers(HttpMethod.POST, "/login", "/register", "/product").permitAll()
								.anyRequest().authenticated()));
		return http.build();
	}

}