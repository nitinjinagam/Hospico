package com.hospitalfinder.backend.Dto;

import lombok.*;

public class LoginResponse {
    @Getter @Setter
    private boolean success;
    @Getter @Setter
    private String message;

    public LoginResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}

