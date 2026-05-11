package com.example.backend.controller;

import com.example.backend.models.Aerolinea;
import com.example.backend.services.AerolineaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/aerolineas")
@CrossOrigin(origins = "*")
public class AerolineaController {

    @Autowired
    private AerolineaService aerolineaService;

    @GetMapping
    public List<Aerolinea> getAllAerolineas() {
        return aerolineaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Aerolinea> getAerolineaById(@PathVariable Long id) {
        return aerolineaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Aerolinea createAerolinea(@Valid @RequestBody Aerolinea aerolinea) {
        return aerolineaService.save(aerolinea);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aerolinea> updateAerolinea(@PathVariable Long id, @Valid @RequestBody Aerolinea aerolineaDetails) {
        return aerolineaService.findById(id)
                .map(aerolinea -> {
                    aerolinea.setNombre(aerolineaDetails.getNombre());
                    aerolinea.setCodigoIata(aerolineaDetails.getCodigoIata());
                    aerolinea.setPais(aerolineaDetails.getPais());
                    return ResponseEntity.ok(aerolineaService.save(aerolinea));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAerolinea(@PathVariable Long id) {
        if (aerolineaService.findById(id).isPresent()) {
            aerolineaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}