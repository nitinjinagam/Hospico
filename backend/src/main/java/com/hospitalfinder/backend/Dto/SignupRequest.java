package com.hospitalfinder.backend.Dto;

import com.hospitalfinder.backend.entity.Role;
import lombok.*;

//@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignupRequest {
    private String name;
    private String email;
    private String phone;
    private String password;
    private Role role;
}

