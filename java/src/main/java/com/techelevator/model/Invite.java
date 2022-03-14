package com.techelevator.model;

import java.sql.Timestamp;

public class Invite {
    private int userId;
    private int inviteId;
    private String InviteTitle;
    private Timestamp expiryDate;
    private Timestamp eventDate;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getInviteId() {
        return inviteId;
    }

    public void setInviteId(int inviteId) {
        this.inviteId = inviteId;
    }

    public String getInviteTitle() {
        return InviteTitle;
    }

    public void setInviteTitle(String inviteTitle) {
        InviteTitle = inviteTitle;
    }

    public Timestamp getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Timestamp expiryDate) {
        this.expiryDate = expiryDate;
    }

    public Timestamp getEventDate() {
        return eventDate;
    }

    public void setEventDate(Timestamp eventDate) {
        this.eventDate = eventDate;
    }

}
