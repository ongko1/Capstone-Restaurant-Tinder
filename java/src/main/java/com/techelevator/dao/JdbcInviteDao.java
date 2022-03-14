package com.techelevator.dao;

import com.techelevator.model.Invite;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@Component
public class JdbcInviteDao implements InviteDao {
    private JdbcTemplate jdbcTemplate;

    public JdbcInviteDao(DataSource ds) {
        this.jdbcTemplate = new JdbcTemplate(ds);
    }

    @Override
    public void addInvite(Invite invite) {
        //Long userID = getUserId(username);
        String sql = "INSERT INTO invites (invite_title, user_id, expiry_date, event_date) " +
                "VALUES (?, ?, ?, ?) RETURNING invite_id";

        int invite_id = jdbcTemplate.queryForObject(sql,
                int.class,
                invite.getInviteTitle(),
                invite.getUserId(),
                invite.getExpiryDate(),
                invite.getEventDate());
        invite.setInviteId(invite_id);
    }

    @Override
    public int addRestaurantToInvite(int userId, String inviteTitle, int restaurantId) {
        return 0;
    }

    @Override
    public Invite getInviteById(int id) {
        Invite invite;
        String sql = "SELECT invite_title, user_id, invite_id, expiry_date, event_date FROM invites WHERE invite_id =?;";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, id);
        if (rowSet.next()) {
            invite = mapRowToInvite(rowSet);
        } else {
            invite = null;
        }
        return invite;
    }

    @Override
    public List<Invite> getInvitesByUserId(int userId) {
        List<Invite> invites = new ArrayList<>();
        String sql = "SELECT invite_title, user_id, invite_id, expiry_date, event_date FROM invites WHERE user_id = ?;";
        SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql, userId);
        while (rowSet.next()) {
            invites.add(mapRowToInvite(rowSet));
        }
        return invites;
    }

    private Invite mapRowToInvite(SqlRowSet rs) {
        Invite invite = new Invite();
        invite.setInviteId(rs.getInt("invite_id"));
        invite.setInviteTitle(rs.getString("invite_title"));
        invite.setUserId(rs.getInt("user_id"));
        invite.setExpiryDate(rs.getTimestamp("expiry_date"));
        invite.setEventDate(rs.getTimestamp("event_date"));
        return invite;
    }

}
