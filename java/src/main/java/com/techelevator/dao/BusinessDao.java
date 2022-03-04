package com.techelevator.dao;

import com.techelevator.model.Business;

import java.util.List;

public interface BusinessDao {
    List<Business> getFavorites(String username);

    int addToFavorites(String businessID, String username);

    int deleteFromFavorites(String businessID, String username);
}
