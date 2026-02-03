package com.arogyam.service;

import com.arogyam.entities.Login;

public interface LoginService {

    Login login(String username, String password);
}
