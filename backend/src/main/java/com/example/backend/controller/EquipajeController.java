package com.example.backend.controller;

import com.example.backend.models.Equipaje;
import com.example.backend.services.EquipajeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipajes")
@Tag(name = "Equipaje", description = "Gestión de equipaje del aeropuerto")
public class EquipajeController {

    @Autowired
    private EquipajeService equipajeService;

    @GetMapping
    @Operation(summary = "Obtener todo el equipaje", description = "Retorna una lista de todo el equipaje registrado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de equipaje obtenida exitosamente")
    })
    public ResponseEntity<List<Equipaje>> getAllEquipajes() {
        List<Equipaje> equipajes = equipajeService.getAllEquipajes();
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener equipaje por ID", description = "Retorna un equipaje específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Equipaje encontrado"),
            @ApiResponse(responseCode = "404", description = "Equipaje no encontrado")
    })
    public ResponseEntity<Equipaje> getEquipajeById(
            @Parameter(description = "ID del equipaje") @PathVariable Long id) {
        return equipajeService.getEquipajeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Registrar nuevo equipaje", description = "Registra un nuevo equipaje en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Equipaje registrado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Pasajero o vuelo no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe equipaje con ese código")
    })
    public ResponseEntity<Equipaje> createEquipaje(
            @Valid @RequestBody Equipaje equipaje) {
        Equipaje createdEquipaje = equipajeService.createEquipaje(equipaje);
        return ResponseEntity.ok(createdEquipaje);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar equipaje", description = "Actualiza la información de un equipaje existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Equipaje actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Equipaje, pasajero o vuelo no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe otro equipaje con ese código")
    })
    public ResponseEntity<Equipaje> updateEquipaje(
            @Parameter(description = "ID del equipaje") @PathVariable Long id,
            @Valid @RequestBody Equipaje equipajeDetails) {
        try {
            Equipaje updatedEquipaje = equipajeService.updateEquipaje(id, equipajeDetails);
            return ResponseEntity.ok(updatedEquipaje);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar equipaje", description = "Elimina un equipaje del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Equipaje eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Equipaje no encontrado")
    })
    public ResponseEntity<Void> deleteEquipaje(
            @Parameter(description = "ID del equipaje") @PathVariable Long id) {
        try {
            equipajeService.deleteEquipaje(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigoEquipaje}")
    @Operation(summary = "Buscar equipaje por código", description = "Encuentra un equipaje usando su código único")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Equipaje encontrado"),
            @ApiResponse(responseCode = "404", description = "Equipaje no encontrado")
    })
    public ResponseEntity<Equipaje> getEquipajeByCodigo(
            @Parameter(description = "Código del equipaje") @PathVariable String codigoEquipaje) {
        return equipajeService.findByCodigoEquipaje(codigoEquipaje)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pasajero/{pasajeroId}")
    @Operation(summary = "Obtener equipaje por pasajero", description = "Retorna todo el equipaje registrado para un pasajero específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de equipaje obtenida exitosamente")
    })
    public ResponseEntity<List<Equipaje>> getEquipajesByPasajero(
            @Parameter(description = "ID del pasajero") @PathVariable Long pasajeroId) {
        List<Equipaje> equipajes = equipajeService.findByPasajeroId(pasajeroId);
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/vuelo/{vueloId}")
    @Operation(summary = "Obtener equipaje por vuelo", description = "Retorna todo el equipaje registrado para un vuelo específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de equipaje obtenida exitosamente")
    })
    public ResponseEntity<List<Equipaje>> getEquipajesByVuelo(
            @Parameter(description = "ID del vuelo") @PathVariable Long vueloId) {
        List<Equipaje> equipajes = equipajeService.findByVueloId(vueloId);
        return ResponseEntity.ok(equipajes);
    }

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Buscar equipaje por estado", description = "Encuentra equipaje filtrado por su estado actual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de equipaje encontrada")
    })
    public ResponseEntity<List<Equipaje>> getEquipajesByEstado(
            @Parameter(description = "Estado del equipaje") @PathVariable Equipaje.EstadoEquipaje estado) {
        List<Equipaje> equipajes = equipajeService.findByEstado(estado);
        return ResponseEntity.ok(equipajes);
    }
}