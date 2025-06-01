package com.hospitalfinder.backend.Dto;

import lombok.*;
public class LoginRequest {
    @Getter @Setter
    private String email;
    @Getter @Setter
    private String password;
}

