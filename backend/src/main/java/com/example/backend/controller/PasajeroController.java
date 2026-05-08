package com.example.backend.controller;

import com.example.backend.models.Pasajero;
import com.example.backend.services.PasajeroService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pasajeros")
@CrossOrigin(origins = "*")
public class PasajeroController {

    @Autowired
    private PasajeroService pasajeroService;

    @GetMapping
    public ResponseEntity<List<Pasajero>> getAllPasajeros() {
        List<Pasajero> pasajeros = pasajeroService.getAllPasajeros();
        return ResponseEntity.ok(pasajeros);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pasajero> getPasajeroById(@PathVariable Long id) {
        return pasajeroService.getPasajeroById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pasajero> createPasajero(@Valid @RequestBody Pasajero pasajero) {
        Pasajero createdPasajero = pasajeroService.createPasajero(pasajero);
        return ResponseEntity.ok(createdPasajero);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pasajero> updatePasajero(@PathVariable Long id, @Valid @RequestBody Pasajero pasajeroDetails) {
        try {
            Pasajero updatedPasajero = pasajeroService.updatePasajero(id, pasajeroDetails);
            return ResponseEntity.ok(updatedPasajero);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePasajero(@PathVariable Long id) {
        try {
            pasajeroService.deletePasajero(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Pasajero> getPasajeroByEmail(@PathVariable String email) {
        return pasajeroService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pasaporte/{numeroPasaporte}")
    public ResponseEntity<Pasajero> getPasajeroByNumeroPasaporte(@PathVariable String numeroPasaporte) {
        return pasajeroService.findByNumeroPasaporte(numeroPasaporte)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}