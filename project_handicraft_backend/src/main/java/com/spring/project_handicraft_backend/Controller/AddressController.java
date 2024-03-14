package com.spring.project_handicraft_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.project_handicraft_backend.DTO.AddressDTO;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Service.AddressService;
import com.spring.project_handicraft_backend.Service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/address")
public class AddressController {
	
	@Autowired
	private AddressService addressService;
	
	@Autowired
	private UserService userService;
	
	 @PostMapping("/save")
	 public ResponseEntity<String> saveAddress(@RequestBody AddressDTO addressDTO) {
		 String response = addressService.saveAddress(addressDTO);
         return new ResponseEntity<>(response, HttpStatus.OK);
	 }
	 
	 @GetMapping("/MyAddress")
	 public ResponseEntity<List<AddressDTO>> activeUserDetails() {
		 UserDto activeUser = userService.activeUserDetailsCollect();
		 List<AddressDTO> address = addressService.getAddressByUserId(activeUser.getId());
	 	return new ResponseEntity<>(address, HttpStatus.OK);
	 }
	 
	 @DeleteMapping("/delete/{id}")
		public ResponseEntity<String> deleteAddress(@PathVariable long id) {
			String response = addressService.deleteAddress(id);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
	 
}
