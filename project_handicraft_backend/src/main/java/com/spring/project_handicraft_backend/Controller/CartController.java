package com.spring.project_handicraft_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.project_handicraft_backend.DAO.ProductUpdate;
import com.spring.project_handicraft_backend.DTO.AddToCartDTO;
import com.spring.project_handicraft_backend.Entity.ProductDetails;
import com.spring.project_handicraft_backend.Service.AddToCartService;

@RestController
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private AddToCartService cartService;
	@Autowired
	private ProductUpdate productUpdate;

	// get cart details
	@SuppressWarnings("null")
	@GetMapping("/details")
	public ResponseEntity<Object> getCartDetails() {
		List<AddToCartDTO> selectedProducts = cartService.selectProduct();
		if (selectedProducts.size() > 0) {
			return new ResponseEntity<>(selectedProducts, HttpStatus.OK);
		}
		return new ResponseEntity<>(null,  HttpStatus.NOT_FOUND);
	}
	
	// add to  Cart 
	@PostMapping("/add")
	public ResponseEntity<Object> addToCart(@RequestBody AddToCartDTO addToCartDTO) {
		
		
		ProductDetails productDetails = productUpdate.findById(addToCartDTO.getProductId()).get();
		
		addToCartDTO.setSellerId(productDetails.getUserID());
		String message = cartService.addToCart(addToCartDTO);
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	// update quantity
	@PostMapping("/update")
	public ResponseEntity<Object> updateQuantity(@RequestBody AddToCartDTO addToCartDTO) {
		AddToCartDTO updatedProduct = cartService.updateQuantity(addToCartDTO.getId(), addToCartDTO.getQuantity());
		if (updatedProduct == null) {
			return new ResponseEntity<>("Your Request Order Not Found", HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }
	
	// delete product from cart
	@DeleteMapping("/delete/{productId}")
	public ResponseEntity<Object> deleteProduct(@PathVariable long productId) {
		cartService.deleteByProduct(productId);
		return new ResponseEntity<>("Delete Sucessfully", HttpStatus.OK);
	}
}
