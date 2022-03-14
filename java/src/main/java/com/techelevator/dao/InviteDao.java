package com.techelevator.dao;

import com.techelevator.model.Invite;

import java.util.List;

public interface InviteDao {
    void addInvite(Invite invite);
    int addRestaurantToInvite(int userId, String inviteTitle, int restaurantId);
    Invite getInviteById(int id);
    List<Invite> getInvitesByUserId(int userId);
}
