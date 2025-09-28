package com.hospitalfinder.backend.controller;


import com.hospitalfinder.backend.entity.Doctor;
import com.hospitalfinder.backend.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class DoctorController {

    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/clinics/{clinicId}/doctors")
    public ResponseEntity<?> getDoctorsByClinicAndSpecialization(
            @PathVariable Long clinicId,
            @RequestParam String specialization) {
        List<Doctor> doctors = doctorRepository.findByClinicIdAndSpecializationIgnoreCase(clinicId, specialization);
        return ResponseEntity.ok(doctors);
    }
}
