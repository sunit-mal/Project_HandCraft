package com.spring.project_handicraft_backend.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.project_handicraft_backend.Entity.AddressDetails;

@Repository
public interface AddressDetailsRepo extends JpaRepository<AddressDetails, Long> {
	public List<AddressDetails> findByUserId(long userId);
	public AddressDetails findById(long id);
}
