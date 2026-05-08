package com.example.backend.services;

import com.example.backend.models.Equipaje;
import com.example.backend.models.Pasajero;
import com.example.backend.models.Vuelo;
import com.example.backend.repository.EquipajeRepository;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.exceptions.ResourceAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EquipajeService {

    @Autowired
    private EquipajeRepository equipajeRepository;

    @Autowired
    private PasajeroService pasajeroService;

    @Autowired
    private VueloService vueloService;

    public List<Equipaje> getAllEquipajes() {
        return equipajeRepository.findAll();
    }

    public Optional<Equipaje> getEquipajeById(Long id) {
        return equipajeRepository.findById(id);
    }

    public Equipaje createEquipaje(Equipaje equipaje) {
        if (equipajeRepository.existsByCodigoEquipaje(equipaje.getCodigoEquipaje())) {
            throw new ResourceAlreadyExistsException("Ya existe equipaje con este código");
        }

        // Verificar que pasajero y vuelo existen
        pasajeroService.getPasajeroById(equipaje.getPasajero().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Pasajero no encontrado"));
        vueloService.getVueloById(equipaje.getVuelo().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Vuelo no encontrado"));

        return equipajeRepository.save(equipaje);
    }

    public Equipaje updateEquipaje(Long id, Equipaje equipajeDetails) {
        Equipaje equipaje = equipajeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Equipaje no encontrado con id: " + id));

        if (!equipaje.getCodigoEquipaje().equals(equipajeDetails.getCodigoEquipaje()) &&
            equipajeRepository.existsByCodigoEquipaje(equipajeDetails.getCodigoEquipaje())) {
            throw new ResourceAlreadyExistsException("Ya existe equipaje con este código");
        }

        // Verificar que pasajero y vuelo existen
        pasajeroService.getPasajeroById(equipajeDetails.getPasajero().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Pasajero no encontrado"));
        vueloService.getVueloById(equipajeDetails.getVuelo().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Vuelo no encontrado"));

        equipaje.setCodigoEquipaje(equipajeDetails.getCodigoEquipaje());
        equipaje.setPasajero(equipajeDetails.getPasajero());
        equipaje.setVuelo(equipajeDetails.getVuelo());
        equipaje.setPeso(equipajeDetails.getPeso());
        equipaje.setDescripcion(equipajeDetails.getDescripcion());
        equipaje.setEstado(equipajeDetails.getEstado());

        return equipajeRepository.save(equipaje);
    }

    public void deleteEquipaje(Long id) {
        if (!equipajeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Equipaje no encontrado con id: " + id);
        }
        equipajeRepository.deleteById(id);
    }

    public Optional<Equipaje> findByCodigoEquipaje(String codigoEquipaje) {
        return equipajeRepository.findByCodigoEquipaje(codigoEquipaje);
    }

    public List<Equipaje> findByPasajeroId(Long pasajeroId) {
        return equipajeRepository.findByPasajeroId(pasajeroId);
    }

    public List<Equipaje> findByVueloId(Long vueloId) {
        return equipajeRepository.findByVueloId(vueloId);
    }

    public List<Equipaje> findByEstado(Equipaje.EstadoEquipaje estado) {
        return equipajeRepository.findByEstado(estado);
    }
}