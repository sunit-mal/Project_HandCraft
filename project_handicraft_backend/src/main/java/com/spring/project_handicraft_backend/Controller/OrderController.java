package com.spring.project_handicraft_backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.project_handicraft_backend.DTO.PlaceOrderDTO;
import com.spring.project_handicraft_backend.Entity.OrderDetails;
import com.spring.project_handicraft_backend.Mapper.PlaceOrderMapper;
import com.spring.project_handicraft_backend.Service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@Autowired 
	private PlaceOrderMapper mapper;

	@PostMapping("/placeOrder")
	public ResponseEntity<Object> placeOrder(@RequestParam("addressId") String addressId,
			@RequestParam("paymentMode") String paymentMode) {
		if (paymentMode != null && addressId != null) {
			orderService.placeOrder(Long.valueOf(addressId), paymentMode);
			return new ResponseEntity<>("Order Placed Successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Order Not Placed", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/totalPrice")
	public ResponseEntity<Object> totalPrice() {
		return new ResponseEntity<>(orderService.getTotalPrice(), HttpStatus.OK);
	}
	
	@GetMapping("/myOrders")
	public ResponseEntity<Object> myOrders() {
		return new ResponseEntity<>(orderService.myOrders(), HttpStatus.OK);
	}
	
	@PostMapping("/statusUpdate/{orderId}")
	public ResponseEntity<Object> statusUpdate(@PathVariable String orderId, @RequestParam("status") String status) {
		if (status != null) {
			PlaceOrderDTO response = mapper.toDTO(orderService.updateOrderStatus(Long.valueOf(orderId), status));
			if (response != null) {
				return new ResponseEntity<>(response, HttpStatus.OK);				
			}else {
				return new ResponseEntity<>("Order Not Found", HttpStatus.NOT_FOUND);
			}
		} else {
			return new ResponseEntity<>("Status Not Updated", HttpStatus.BAD_REQUEST);
		}
	}
	
	@GetMapping("/orderAddress/{orderId}")
	public ResponseEntity<Object> orderAddress(@PathVariable String orderId) {
		Object response = new Object();
		OrderDetails order = orderService.getDetailsByOrderId(Long.valueOf(orderId));
		
		response = order.getAddress() + ", " + order.getCity() + ", " + order.getState() + ", " + order.getCountry() + ", " + order.getPostalCode()+ ", " + order.getPhoneNumber();
		return new ResponseEntity<>(response, HttpStatus.OK);
	}
}
