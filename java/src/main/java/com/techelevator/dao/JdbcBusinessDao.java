package com.techelevator.dao;

import com.techelevator.model.Business;
import com.techelevator.model.User;
import com.techelevator.services.YelpService;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@Component
public class JdbcBusinessDao implements BusinessDao{
    private JdbcTemplate jdbcTemplate;
    private YelpService yelpService;

    public JdbcBusinessDao(JdbcTemplate jdbcTemplate, YelpService yelpService) {
        this.jdbcTemplate = jdbcTemplate;
        this.yelpService = yelpService;
    }

    @Override
    public List<Business> getFavorites(String username) {
        List<Business> businessList = new ArrayList<>();
        Long userID = getUserId(username);
        String sql = "SELECT business_id FROM favorites WHERE user_id = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, userID);
        while(results.next()) {
            String businessID = results.getString("business_id");
            businessList.add(yelpService.getBusinessByID(businessID));
        }
        return businessList;
    }

    @Override
    public int addToFavorites(String businessID, String username) {
        int result = 0;
        Long userID = getUserId(username);
        String sql = "INSERT INTO favorites (user_id, business_id) " +
                "VALUES (?, ?)";
        try {
            result = jdbcTemplate.update(sql, userID, businessID);
        } catch (DataAccessException e){
        }
        return result;
    }

    @Override
    public int deleteFromFavorites(String businessID, String username) {
        int result = 0;
        Long userID = getUserId(username);
        String sql = "DELETE FROM favorites WHERE user_id = ? AND business_id = ?";
        try {
            result = jdbcTemplate.update(sql, userID, businessID);
        } catch (DataAccessException e){
        }
        return result;
    }

    private Long getUserId(String username) {
        String sql = "SELECT user_id " +
                "FROM users " +
                "WHERE username = ?";
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, username);
        User user = null;
        if (results.first()) {
            user = new User();
            user.setId(results.getLong("user_id"));
        }
        return user.getId();
    }


}
