package com.hospitalfinder.backend.controller;

import com.hospitalfinder.backend.Dto.ClinicRequestDTO;
import com.hospitalfinder.backend.Dto.ClinicResponseDTO;
import com.hospitalfinder.backend.entity.Clinic;
import com.hospitalfinder.backend.repository.ClinicRepository;
import com.hospitalfinder.backend.service.ClinicService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clinics")
@RequiredArgsConstructor
public class ClinicController {

    private final ClinicService clinicService;
    private final ClinicRepository clinicRepository;

    @GetMapping
    public List<ClinicResponseDTO> getClinics(
            @RequestParam(required = false) String city,
            @RequestParam(required = false) String specialization
    ) {
        return clinicService.getFilteredClinics(city, specialization);
    }

    @GetMapping("api/clinics/nearby")
    public ResponseEntity<?> getNearbyClinics(
            @RequestParam double lat,
            @RequestParam double lng
    ) {
        List<Clinic> clinics = clinicRepository.findNearestClinics(lat, lng);
        return ResponseEntity.ok(clinics);
    }


    @PostMapping
    public ResponseEntity<ClinicResponseDTO> createClinic(@RequestBody ClinicRequestDTO request) {
        ClinicResponseDTO created = clinicService.createClinic(request);
        return ResponseEntity.ok(created);
    }

    @DeleteMapping("api/clinics/{id}")
    public ResponseEntity<?> deleteClinic(@PathVariable Long id) {
        if (!clinicRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        clinicRepository.deleteById(id);
        return ResponseEntity.ok("Clinic deleted successfully");
    }

}

