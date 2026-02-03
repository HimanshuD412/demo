package com.arogyam.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.arogyam.custom_exceptions.AuthenticationException;
import com.arogyam.entities.Login;
import com.arogyam.repository.LoginRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl implements LoginService {

    private final LoginRepository loginRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public Login login(String username, String password) {

        Login login = loginRepository.findByUsername(username);

        if (login == null) {
            throw new AuthenticationException("Invalid username or password");
        }

        if (!passwordEncoder.matches(password, login.getPassword()))
 {
            throw new AuthenticationException("Invalid username or password");
        }


        return login;
    }
}
