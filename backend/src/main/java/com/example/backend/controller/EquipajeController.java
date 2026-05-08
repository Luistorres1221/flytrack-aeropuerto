package com.example.backend.controller;

import com.example.backend.models.Equipaje;
import com.example.backend.services.EquipajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipajes")
@CrossOrigin(origins = "*")
public class EquipajeController {

    @Autowired
    private EquipajeService equipajeService;

    @GetMapping
    public ResponseEntity<List<Equipaje>> getAllEquipajes() {
        List<Equipaje> equipajes = equipajeService.getAllEquipajes();
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipaje> getEquipajeById(@PathVariable Long id) {
        return equipajeService.getEquipajeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Equipaje> createEquipaje(@Valid @RequestBody Equipaje equipaje) {
        Equipaje createdEquipaje = equipajeService.createEquipaje(equipaje);
        return ResponseEntity.ok(createdEquipaje);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipaje> updateEquipaje(@PathVariable Long id, @Valid @RequestBody Equipaje equipajeDetails) {
        try {
            Equipaje updatedEquipaje = equipajeService.updateEquipaje(id, equipajeDetails);
            return ResponseEntity.ok(updatedEquipaje);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipaje(@PathVariable Long id) {
        try {
            equipajeService.deleteEquipaje(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigoEquipaje}")
    public ResponseEntity<Equipaje> getEquipajeByCodigo(@PathVariable String codigoEquipaje) {
        return equipajeService.findByCodigoEquipaje(codigoEquipaje)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pasajero/{pasajeroId}")
    public ResponseEntity<List<Equipaje>> getEquipajesByPasajero(@PathVariable Long pasajeroId) {
        List<Equipaje> equipajes = equipajeService.findByPasajeroId(pasajeroId);
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/vuelo/{vueloId}")
    public ResponseEntity<List<Equipaje>> getEquipajesByVuelo(@PathVariable Long vueloId) {
        List<Equipaje> equipajes = equipajeService.findByVueloId(vueloId);
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Equipaje>> getEquipajesByEstado(@PathVariable Equipaje.EstadoEquipaje estado) {
        List<Equipaje> equipajes = equipajeService.findByEstado(estado);
        return ResponseEntity.ok(equipajes);
    }
}