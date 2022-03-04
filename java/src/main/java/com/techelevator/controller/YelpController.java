package com.techelevator.controller;
import java.util.List;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.techelevator.model.Business;
import com.techelevator.services.YelpService;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class YelpController {

    private YelpService yelpService;

    public YelpController(YelpService yelpService) { // will need a restaurant DAO
        this.yelpService = yelpService;
    }

    @RequestMapping(path = "/businesses" , method = RequestMethod.GET)
    public Business[] getBusinesses(@RequestHeader String zipCode, @RequestHeader String category, @RequestHeader String radius) {
        List<Business> businessList = null;
        if(radius.equals("")) {
            businessList = yelpService.getBusinessesNoRadius(zipCode, category);
        } else {
            businessList = yelpService.getBusinessesWithRadius(zipCode, category, radius);
        }
        Business[] businessArray = new Business[businessList.size()];
        return businessList.toArray(businessArray);
    }

}
