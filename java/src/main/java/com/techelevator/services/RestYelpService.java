package com.techelevator.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.client.RestTemplate;
import com.techelevator.model.Business;
import com.techelevator.model.YelpBusinessesResponse;

@CrossOrigin
@Component
public class RestYelpService implements YelpService {
    private final String BASE_URL = "https://api.yelp.com/v3/";
    private final String TOKEN;
    private RestTemplate restTemplate = new RestTemplate();

    public RestYelpService(@Value("${yelp.api.key}") String TOKEN ) {
        this.TOKEN = TOKEN;
    }


    @Override
    public List<Business> getBusinessesNoRadius(String zipCode, String category) {
        YelpBusinessesResponse response = restTemplate.exchange(BASE_URL + "businesses/search?location={zipCode}&term={category}&limit=10",
                HttpMethod.GET, makeAuthEntity(TOKEN), YelpBusinessesResponse.class, zipCode, category).getBody();
        return response.getBusinesses();
    }

    @Override
    public List<Business> getBusinessesWithRadius(String zipCode, String category, String radius) {
        YelpBusinessesResponse response = restTemplate.exchange(BASE_URL + "businesses/search?location={zipCode}&term={category}&radius={radius}&limit=10",
                HttpMethod.GET, makeAuthEntity(TOKEN), YelpBusinessesResponse.class, zipCode, category, radius).getBody();
        return response.getBusinesses();
    }

    @Override
    public Business getBusinessByID(String businessID) {
        Business business = restTemplate.exchange(BASE_URL + "businesses/{businessID}",
                HttpMethod.GET, makeAuthEntity(TOKEN), Business.class, businessID).getBody();
        return business;
    }

    private HttpEntity<String> makeAuthEntity(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        return entity;
    }
}
