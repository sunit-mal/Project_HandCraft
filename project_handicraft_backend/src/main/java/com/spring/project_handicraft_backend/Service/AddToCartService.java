package com.spring.project_handicraft_backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project_handicraft_backend.DAO.AddToCartRepo;
import com.spring.project_handicraft_backend.DTO.AddToCartDTO;
import com.spring.project_handicraft_backend.Entity.AddToCart;
import com.spring.project_handicraft_backend.Mapper.AddToCartMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AddToCartService {

	@Autowired
	private UserService userService;
	@Autowired
	private AddToCartRepo addToCartRepo;
	@Autowired
	private AddToCartMapper addToCartMapper;

	public List<AddToCartDTO> selectProduct() {
		List<AddToCart> addToCart = addToCartRepo.findByBuyerId(userService.activeUserDetailsCollect().getId());
		List<AddToCartDTO> addToCartResponse = new ArrayList<>();

		for (AddToCart addtocartobj : addToCart) {
			try {
				AddToCartDTO tempObject = addToCartMapper.toDTO(addtocartobj);
				if (tempObject != null) {
					addToCartResponse.add(tempObject);
				}
			} catch (Exception e) {
				System.err.println("Not found");
			}

		}
		return addToCartResponse;
	}

	public String addToCart(AddToCartDTO addToCartDTO) {
		AddToCart addToCart = addToCartMapper.toEntity(addToCartDTO);
		addToCart.setBuyerId(userService.activeUserDetailsCollect().getId());
		addToCart.setQuantity(0);
		addToCartRepo.save(addToCart);
		return "Product Added to Cart Successfully";
	}

	public AddToCartDTO updateQuantity(long id, int quantity) {
		List<AddToCart> filterCart = addToCartRepo.findByBuyerId(userService.activeUserDetailsCollect().getId());
		if (filterCart.isEmpty()) {
			return null;
		}
		AddToCart myCart = new AddToCart();
		for (AddToCart addToCart : filterCart) {
			if (addToCart.getProductId() == id) {
				myCart = addToCart;
			}
		}
		if (myCart.getBuyerId() != userService.activeUserDetailsCollect().getId()) {
			return null;
		}
		myCart.setQuantity(quantity);
		addToCartRepo.save(myCart);
		return addToCartMapper.toDTO(myCart);
	}

	public void deleteByProduct(long productId) {
		AddToCart obj = addToCartRepo.findByProductId(productId);
		addToCartRepo.delete(obj);
	}
}
