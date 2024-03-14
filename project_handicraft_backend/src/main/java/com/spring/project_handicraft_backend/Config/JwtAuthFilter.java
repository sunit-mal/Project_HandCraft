package com.spring.project_handicraft_backend.Config;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.spring.project_handicraft_backend.Exception.GlobalExceptionHandler;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter{
	private final UserAuthProvider userAuthProvider;

	@SuppressWarnings("null")
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		String header = request.getHeader(HttpHeaders.AUTHORIZATION);

		if (header != null) {
			String[] elements = header.split(" ");

			if (elements.length == 2 && "Bearer".equals(elements[0])) {
				try {
					SecurityContextHolder.getContext().setAuthentication(userAuthProvider.validateToken(elements[1]));
				} catch (RuntimeException e) {
					SecurityContextHolder.clearContext();
					System.err.println(new GlobalExceptionHandler().handleTokenExpiredException(e));
					new GlobalExceptionHandler().handleTokenExpiredException(e);

					// throw e;
				}
			}
		}

		filterChain.doFilter(request, response);
	}

	
}
