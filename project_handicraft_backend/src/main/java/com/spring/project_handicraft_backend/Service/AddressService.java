package com.spring.project_handicraft_backend.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.project_handicraft_backend.DAO.AddressDetailsRepo;
import com.spring.project_handicraft_backend.DTO.AddressDTO;
import com.spring.project_handicraft_backend.DTO.UserDto;
import com.spring.project_handicraft_backend.Entity.AddressDetails;
import com.spring.project_handicraft_backend.Mapper.AdderssMapper;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class AddressService {

	@Autowired
	private UserService userService;
	@Autowired
	private AddressDetailsRepo addressDetailsRepo;
	@Autowired
	private AdderssMapper adderssMapper;

	public String saveAddress(AddressDTO addressDTO) {
		
		UserDto activeUser = userService.activeUserDetailsCollect();
		AddressDetails addressDetails = adderssMapper.toAddressDetails(addressDTO);
		addressDetails.setUserId(activeUser.getId());
		addressDetailsRepo.save(addressDetails);

		return "Address Saved Successfully";
	}

	public List<AddressDTO> getAddressByUserId(long userId) {
		List<AddressDetails> addressDetails = addressDetailsRepo.findByUserId(userId);
		List<AddressDTO> addressResponse = new ArrayList<>();
		for (AddressDetails AddressObj : addressDetails) {
			AddressDTO address = adderssMapper.toaAddressDTO(AddressObj);
			addressResponse.add(address);
		}
		return addressResponse;
	}
	
	public String deleteAddress(long id) {
		addressDetailsRepo.deleteById(id);
		return "Address Deleted Successfully";
	}
}
