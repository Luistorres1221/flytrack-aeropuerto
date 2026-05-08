package com.example.backend.controller;

import com.example.backend.models.Vuelo;
import com.example.backend.services.VueloService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vuelos")
@CrossOrigin(origins = "*")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    @GetMapping
    public ResponseEntity<List<Vuelo>> getAllVuelos() {
        List<Vuelo> vuelos = vueloService.getAllVuelos();
        return ResponseEntity.ok(vuelos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vuelo> getVueloById(@PathVariable Long id) {
        return vueloService.getVueloById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vuelo> createVuelo(@Valid @RequestBody Vuelo vuelo) {
        Vuelo createdVuelo = vueloService.createVuelo(vuelo);
        return ResponseEntity.ok(createdVuelo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vuelo> updateVuelo(@PathVariable Long id, @Valid @RequestBody Vuelo vueloDetails) {
        try {
            Vuelo updatedVuelo = vueloService.updateVuelo(id, vueloDetails);
            return ResponseEntity.ok(updatedVuelo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVuelo(@PathVariable Long id) {
        try {
            vueloService.deleteVuelo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigoVuelo}")
    public ResponseEntity<Vuelo> getVueloByCodigo(@PathVariable String codigoVuelo) {
        return vueloService.findByCodigoVuelo(codigoVuelo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Vuelo>> buscarVuelos(
            @RequestParam String origen,
            @RequestParam String destino) {
        List<Vuelo> vuelos = vueloService.findByOrigenAndDestino(origen, destino);
        return ResponseEntity.ok(vuelos);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Vuelo>> getVuelosByEstado(@PathVariable Vuelo.EstadoVuelo estado) {
        List<Vuelo> vuelos = vueloService.findByEstado(estado);
        return ResponseEntity.ok(vuelos);
    }
}