package com.techelevator.services;

import com.techelevator.model.Business;

import java.util.List;

public interface YelpService {
    List<Business> getBusinessesNoRadius(String zipCode, String category);

    List<Business> getBusinessesWithRadius(String zipCode, String category, String radius);

    Business getBusinessByID(String businessID);
}
