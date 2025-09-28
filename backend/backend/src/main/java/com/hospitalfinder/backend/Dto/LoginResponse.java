package com.hospitalfinder.backend.Dto;

import lombok.*;

public class LoginResponse {
    @Getter @Setter
    private boolean success;
    @Getter @Setter
    private String message;
    @Getter @Setter
    private Long id;

    public LoginResponse(boolean success, String message, Long id) {
        this.success = success;
        this.message = message;
        this.id = id;
    }
}

