package com.spring.project_handicraft_backend.Service;

import java.util.ArrayList;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.spring.project_handicraft_backend.DAO.ProductUpdate;
import com.spring.project_handicraft_backend.DTO.ProductResponse;
import com.spring.project_handicraft_backend.Entity.ProductDetails;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ProductUpdateService {

	@Value("${project.image}")
	private String mainPath;

	@Autowired
	private ProductUpdate products;

	public String ProductIMGUpload(String path, MultipartFile file, String filename) throws IOException {

		@SuppressWarnings("null")
		String orginalNameString = file.getOriginalFilename().replaceAll(" ", "");

		// Create full path
		String filePath = path + File.separator + orginalNameString;

		// Create folder if not created
		File f = new File(path);
		if (!f.exists()) {
			f.mkdir();
		}

		File existingFile = new File(filePath);
		if (existingFile.exists()) {
			return "imgage file name already exits use different file name";
		}

		Files.copy(file.getInputStream(), Paths.get(filePath));
		return "Store Sucessfully";
	}

	public String ProductUpdate(String path, MultipartFile file, String fileName, String Description, int price,
			int quantity, String catagories, String productName, long userID) throws IOException {

		String response = ProductIMGUpload(path, file, fileName);

		if (response == "imgage file name already exits use different file name")
			return response;

		ProductDetails obj = new ProductDetails();
		obj.setCatagories(catagories);
		obj.setFileName(fileName);
		obj.setDescription(Description);
		obj.setPrice(price);
		obj.setQualtity(quantity);
		obj.setProductName(productName);
		obj.setUserID(userID);

		products.save(obj);

		return response;
	}

	@SuppressWarnings("null")
	public ProductDetails fetchData(Long id) {
		ProductDetails Productobject = new ProductDetails();
		try {
			Productobject = products.findById(id).get();
			if (Productobject != null) {
				return Productobject;
			} else {
				System.err.println("Product Not Found");
				return null;
			}
		} catch (Exception e) {
			System.err.println("Product Not Found");
			return null;
		}

	}

	public List<ProductDetails> getAllProductDetails() {
		List<ProductDetails> allProductData = products.findAll();
		return allProductData;
	}

	public List<ProductResponse> getMyProduct(long id) {
		List<ProductDetails> productDetails = products.getDetailsByUserID(id);
		List<ProductResponse> responseDetails = new ArrayList<>();

		for (ProductDetails product : productDetails) {
			ProductResponse tempObj = new ProductResponse();
			tempObj.setProductId(product.getId());
			tempObj.setProductName(product.getProductName());
			tempObj.setCatagories(product.getCatagories());
			tempObj.setDescription(product.getDescription());
			tempObj.setPrice(product.getPrice());
			tempObj.setQualtity(product.getQualtity());
			tempObj.setFilename(product.getFileName());
			responseDetails.add(tempObj);
		}
		return (List<ProductResponse>) responseDetails;
	}

	@SuppressWarnings("deprecation")
	public ProductResponse updateDetails(@NonNull Long id, int qualtity) {
		ProductDetails productDetails = products.getById(id);
		productDetails.setQualtity(qualtity);
		products.save(productDetails);
		ProductResponse response = new ProductResponse();
		response.setCatagories(productDetails.getCatagories());
		response.setDescription(productDetails.getDescription());
		response.setFilename(productDetails.getFileName());
		response.setPrice(productDetails.getPrice());
		response.setProductId(productDetails.getId());
		response.setProductName(productDetails.getProductName());
		response.setQualtity(productDetails.getQualtity());

		return response;
	}

	@SuppressWarnings("null")
	public String deleteProduct(Long id) {
		ProductDetails productsDetails = products.findById(id).get();
		String fullpathString = mainPath + File.separator + productsDetails.getFileName();
		Path filepath = Paths.get(fullpathString);
		try {
			Files.deleteIfExists(filepath);
		} catch (IOException e) {
			return "File not found";
		}
		products.deleteById(id);
		return "Deleted Sucessfully";
	}
}
