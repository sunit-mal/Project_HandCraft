package com.spring.project_handicraft_backend.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project_handicraft_backend.DAO.AddToCartRepo;
import com.spring.project_handicraft_backend.DAO.AddressDetailsRepo;
import com.spring.project_handicraft_backend.DAO.OrderDetailsRepo;
import com.spring.project_handicraft_backend.DAO.PlaceOrderRepo;
import com.spring.project_handicraft_backend.DAO.ProductUpdate;
import com.spring.project_handicraft_backend.DTO.PlaceOrderDTO;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Entity.AddToCart;
import com.spring.project_handicraft_backend.Entity.AddressDetails;
import com.spring.project_handicraft_backend.Entity.OrderDetails;
import com.spring.project_handicraft_backend.Entity.PlaceOrder;
import com.spring.project_handicraft_backend.Entity.ProductDetails;
import com.spring.project_handicraft_backend.Mapper.PlaceOrderMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService {

	@Autowired
	private PlaceOrderMapper placeOrderMapper;
	@Autowired
	private OrderDetailsRepo orderDetailsRepo;
	@Autowired
	private PlaceOrderRepo placeOrderRepo;
	@Autowired
	private UserService userService;
	@Autowired
	private ProductUpdate productUpdateRepo;
	@Autowired
	private AddToCartRepo addToCartRepo;
	@Autowired
	private AddressDetailsRepo addressRepo;

	// Place Order
	public void placeOrder(long addressId, String paymentMode) {
		Long userId = userService.activeUserDetailsCollect().getId();
		LocalDateTime now = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
		String dateAndTime = now.format(formatter);

		AddressDetails address = addressRepo.findById(addressId);
		List<AddToCart> cartItems = addToCartRepo.findByBuyerId(userId);

//		Order Generate
		OrderDetails order = new OrderDetails();
		order.setAddress(address.getAddress());
		order.setCity(address.getCity());
		order.setState(address.getState());
		order.setCountry(address.getCountry());
		order.setPostalCode(address.getPostalCode());
		order.setPhoneNumber(address.getPhoneNumber());
		order.setDateAndTime(dateAndTime);
		order.setPaymentMode(paymentMode);
		order.setTotalPrice(0);
		OrderDetails savedOrder = orderDetailsRepo.save(order);

		long totalPrice = 0;
		for (AddToCart productInCart : cartItems) {
			try {
				ProductDetails product = productUpdateRepo.findById(productInCart.getProductId()).get();
				if (product != null) {
					PlaceOrder placeOrder = new PlaceOrder();
					placeOrder.setBuyerId(productInCart.getBuyerId());
					placeOrder.setSellerId(productInCart.getSellerId());
					placeOrder.setProductId(productInCart.getProductId());
					placeOrder.setQuantity(productInCart.getQuantity());
					placeOrder.setOrderId(savedOrder.getId());
					placeOrder.setPrice(product.getPrice() * productInCart.getQuantity());
					placeOrder.setPaymentStatus(paymentMode);
					placeOrder.setStatus("Not Delivered");
					placeOrderRepo.save(placeOrder);

					product.setQualtity(product.getQualtity() - productInCart.getQuantity());
					productUpdateRepo.save(product);

					totalPrice += product.getPrice() * productInCart.getQuantity();
				}
			} catch (Exception e) {
				System.err.println("Product no : " + productInCart.getProductId() + " not found");
			}
			addToCartRepo.deleteById(productInCart.getId());
		}
		savedOrder.setTotalPrice(totalPrice);
		orderDetailsRepo.save(savedOrder);
	}

	// Get Total Price
	public long getTotalPrice() {
		Long userId = userService.activeUserDetailsCollect().getId();
		List<AddToCart> cartItems = addToCartRepo.findByBuyerId(userId);
		long totalPrice = 0;
		for (AddToCart productInCart : cartItems) {
			try {
				ProductDetails product = productUpdateRepo.findById(productInCart.getProductId()).get();
				totalPrice += product.getPrice() * productInCart.getQuantity();
			} catch (Exception e) {
				System.err.println(e.getMessage());
			}
		}
		return totalPrice;
	}

	// My Orders
	public List<PlaceOrderDTO> myOrders() {
		UserDto activeUser = userService.activeUserDetailsCollect();
		List<PlaceOrder> myorders = new ArrayList<>();
		List<PlaceOrderDTO> responseOrder = new ArrayList<>();
		if (activeUser.getUserType().equals("Seller")) {
			myorders = placeOrderRepo.findBySellerId(activeUser.getId());
		} else {
			myorders = placeOrderRepo.findByBuyerId(activeUser.getId());
		}
		for (PlaceOrder orders : myorders) {
			PlaceOrderDTO temp = placeOrderMapper.toDTO(orders);
			responseOrder.add(temp);
		}
		return responseOrder;
	}

	// Update Order Status
	public PlaceOrder updateOrderStatus(long orderId, String status) {
		try {
			PlaceOrder order = placeOrderRepo.findById(orderId).get();
			order.setStatus(status);
			order = placeOrderRepo.save(order);
			return order;
		} catch (Exception e) {
			System.err.println(e.getMessage());
			return null;
		}
	}
	
	//Get Details By OrderID
	public OrderDetails getDetailsByOrderId(long orderID) {
		return orderDetailsRepo.findById(orderID).get();
	}
}
