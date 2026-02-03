package com.arogyam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.arogyam.dto.LoginRequestDTO;
import com.arogyam.dto.LoginResponseDTO;
import com.arogyam.entities.Login;
import com.arogyam.security.JwtUtil;
import com.arogyam.service.LoginService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final LoginService loginService;
    private final JwtUtil jwtUtil;


    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(
            @RequestBody LoginRequestDTO dto) {

        Login login = loginService.login(dto.getUsername(), dto.getPassword());

        String id = null;

        if (login.getEmployee() != null) {
            id = login.getEmployee().getEid();   // admin/doctor/receptionist
        } else {
            id = login.getUsername();            // patient (pid = username)
        }

        String token = jwtUtil.generateToken(
                login.getUsername(),
                login.getRole(),
                id
        );

        LoginResponseDTO response = new LoginResponseDTO(
                login.getUsername(),
                login.getRole(),
                id,
                token
        );



        return ResponseEntity.ok(response);
    }
}
