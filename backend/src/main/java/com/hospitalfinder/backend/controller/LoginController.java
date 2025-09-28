package com.hospitalfinder.backend.controller;

import com.hospitalfinder.backend.Dto.LoginRequest;
import com.hospitalfinder.backend.Dto.LoginResponse;
import com.hospitalfinder.backend.entity.User;
import com.hospitalfinder.backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail());
//        System.out.println(user.getName());
//        System.out.println(user.getEmail());
//        System.out.println(user.getPhone());
//        System.out.println(user.getRole());
//        System.out.println(user.getName());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new LoginResponse(false, "Invalid credentials"));
        }

        return ResponseEntity.ok(new LoginResponse(true, "Login successful"));
    }
}
