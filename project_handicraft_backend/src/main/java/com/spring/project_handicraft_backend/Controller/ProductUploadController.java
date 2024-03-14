package com.spring.project_handicraft_backend.Controller;

import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.spring.project_handicraft_backend.DTO.ProductResponse;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Entity.ProductDetails;
import com.spring.project_handicraft_backend.Service.ProductUpdateService;
import com.spring.project_handicraft_backend.Service.UserService;

@RestController
@RequestMapping("/product")
public class ProductUploadController {

	@Autowired
	private ProductUpdateService service;
	@Autowired
	private UserService userService;

	@Value("${project.image}")
	private String path;

	@SuppressWarnings("null")
	@PostMapping("/upload")
	public ResponseEntity<String> uploadFiles(@RequestParam("image") MultipartFile file,
			@RequestParam("description") String description, @RequestParam("price") int price,
			@RequestParam("quantity") int quantity, @RequestParam("Categories") String Categories,
			@RequestParam("productName") String productName) throws IOException {

		if (file.isEmpty()==false) {
			String fileNameString = file.getOriginalFilename().replaceAll(" ", "");
			if (description.isEmpty() || price == 0 || quantity == 0 || Categories.isEmpty() || productName.isEmpty()) {
				return new ResponseEntity<>("Please Fill All The Fields", HttpStatus.BAD_REQUEST);
			}
			UserDto user = userService.activeUserDetailsCollect();
			String response = service.ProductUpdate(path, file, fileNameString, description, price, quantity,
					Categories, productName,user.getId());
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<>("File Not Found ", HttpStatus.BAD_REQUEST);
		}

	}

	@GetMapping("/fetchall")
	public ResponseEntity<ArrayList<ProductResponse>> fetchAll() throws Exception {
		List<ProductDetails> productData = service.getAllProductDetails();
		ArrayList<ProductResponse> responseData = new ArrayList<>();
		for (ProductDetails productDetails : productData) {

			ProductResponse objProductResponse = new ProductResponse();
			objProductResponse.setProductId(productDetails.getId());
			objProductResponse.setCatagories(productDetails.getCatagories());
			objProductResponse.setDescription(productDetails.getDescription());
			objProductResponse.setPrice(productDetails.getPrice());
			objProductResponse.setProductName(productDetails.getProductName());
			objProductResponse.setQualtity(productDetails.getQualtity());
			objProductResponse.setFilename(productDetails.getFileName());

			responseData.add(objProductResponse);
		}

		return new ResponseEntity<>(responseData, HttpStatus.OK);
	}

	@SuppressWarnings("null")
	@GetMapping("/productImage/{filename}")
	public ResponseEntity<Object> ImagEntity(@PathVariable String filename) throws Exception {
		Path jpgPath = Paths.get(path).resolve(filename);

		UrlResource jpgResource = new UrlResource(jpgPath.toUri());

		if (jpgResource.exists() && jpgResource.isReadable()) {
			HttpHeaders headers = new HttpHeaders();
			headers.add(HttpHeaders.CONTENT_TYPE, MediaType.IMAGE_JPEG_VALUE);
			return ResponseEntity.ok().headers(headers).body(jpgResource);

		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping("/fetch/{id}")
	public ResponseEntity<Object> fetchData(@PathVariable String id) {

		Long idInLong = Long.valueOf(id);
		ProductDetails objDetails = new ProductDetails();
		objDetails = service.fetchData(idInLong);
		if (objDetails != null) {
			ProductResponse responseObject = new ProductResponse();
			responseObject.setProductId(objDetails.getId());
			responseObject.setProductName(objDetails.getProductName());
			responseObject.setDescription(objDetails.getDescription());
			responseObject.setCatagories(objDetails.getCatagories());
			responseObject.setPrice(objDetails.getPrice());
			responseObject.setQualtity(objDetails.getQualtity());
			responseObject.setFilename(objDetails.getFileName());
			return new ResponseEntity<>(responseObject, HttpStatus.OK);			
		}else {
			return new ResponseEntity<>("Product Not Found", HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/FindByCatagories/{Catagories}")
	public ResponseEntity<Object> fetchDataAccourdingCatagories(@PathVariable String Catagories) {

		List<ProductDetails> productDetails = service.getAllProductDetails();
		List<ProductResponse> responsesData = new ArrayList<>();

		for (ProductDetails eachProductDetails : productDetails) {
			String catagorie = eachProductDetails.getCatagories().toString();
			if (catagorie.contains(Catagories)) {
				ProductResponse responseObject = new ProductResponse();
				responseObject.setProductId(eachProductDetails.getId());
				responseObject.setProductName(eachProductDetails.getProductName());
				responseObject.setDescription(eachProductDetails.getDescription());
				responseObject.setCatagories(eachProductDetails.getCatagories());
				responseObject.setPrice(eachProductDetails.getPrice());
				responseObject.setQualtity(eachProductDetails.getQualtity());
				responseObject.setFilename(eachProductDetails.getFileName());
				responsesData.add(responseObject);
			}
		}
		return new ResponseEntity<>(responsesData, HttpStatus.OK);
	}

	@GetMapping("/myproduct")
	public ResponseEntity<Object> activeUser() {
		UserDto user = userService.activeUserDetailsCollect();
		List<ProductResponse> response = service.getMyProduct(user.getId());
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@PostMapping("/quantityupdate/{id}")
	public ResponseEntity<Object> updateQuantity(@PathVariable String id, @RequestParam String quantity) {

		long productId = Long.valueOf(id);
		int newquantity = Integer.valueOf(quantity);
		ProductResponse obj = service.updateDetails(productId, newquantity);

		return new ResponseEntity<Object>(obj, HttpStatus.OK);

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Object> serveImage(@PathVariable String id) throws Exception {
		long idInLong = Long.valueOf(id);
		String response = service.deleteProduct(idInLong);
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
