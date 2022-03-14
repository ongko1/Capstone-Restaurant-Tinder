package com.techelevator.controller;

import com.techelevator.dao.InviteDao;
import com.techelevator.model.Invite;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class InviteController {
    private InviteDao inviteDao;

    public InviteController(InviteDao inviteDao) {
        this.inviteDao = inviteDao;
    }

    @RequestMapping(path="/invites/{id}", method = RequestMethod.GET)
    public Invite getInvite(@PathVariable int id) {
        return inviteDao.getInviteById(id);
    }

    @RequestMapping(path="/invites/user/{user_id}", method = RequestMethod.GET)
    public List<Invite> getInviteByUser(@PathVariable int user_id) {
        return inviteDao.getInvitesByUserId(user_id);
    }

    @ResponseStatus(HttpStatus.CREATED)
    @RequestMapping(path="/invites", method = RequestMethod.POST)
    public void addInvite(@RequestBody Invite invite)  {
        inviteDao.addInvite(invite);
    }



}
