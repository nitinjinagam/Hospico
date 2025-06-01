package com.hospitalfinder.backend.controller;

import com.hospitalfinder.backend.Dto.SignupRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class TestController {

    @PostMapping("/test")
    public ResponseEntity<?> echo(@RequestBody SignupRequest input) {
        System.out.println("Received JSON in /api/auth/test: " + input);
        return ResponseEntity.ok(input);
    }
}
