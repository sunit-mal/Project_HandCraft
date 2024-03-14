package com.spring.project_handicraft_backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Entity
@NoArgsConstructor
@Builder
@Table(name = "detailsOfproduct")
@Data
public class ProductDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column
	private long userID;
	@Column
	private String productName;
	@Column
	private String fileName;
	@Column(length = 10000)
	private String Description;
	@Column
	private int price;
	@Column
	private int qualtity;
	@Column
	private String Catagories;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getUserID() {
		return userID;
	}
	public void setUserID(long userID) {
		this.userID = userID;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public int getQualtity() {
		return qualtity;
	}
	public void setQualtity(int qualtity) {
		this.qualtity = qualtity;
	}
	public String getCatagories() {
		return Catagories;
	}
	public void setCatagories(String catagories) {
		Catagories = catagories;
	}
	
	
	
}
