package com.example.backend.services;

import com.example.backend.models.Vuelo;
import com.example.backend.repository.VueloRepository;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.exceptions.ResourceAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class VueloService {

    @Autowired
    private VueloRepository vueloRepository;

    public List<Vuelo> getAllVuelos() {
        return vueloRepository.findAll();
    }

    public Optional<Vuelo> getVueloById(Long id) {
        return vueloRepository.findById(id);
    }

    public Vuelo createVuelo(Vuelo vuelo) {
        if (vueloRepository.existsByCodigoVuelo(vuelo.getCodigoVuelo())) {
            throw new ResourceAlreadyExistsException("Ya existe un vuelo con este código");
        }
        return vueloRepository.save(vuelo);
    }

    public Vuelo updateVuelo(Long id, Vuelo vueloDetails) {
        Vuelo vuelo = vueloRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vuelo no encontrado con id: " + id));

        if (!vuelo.getCodigoVuelo().equals(vueloDetails.getCodigoVuelo()) &&
            vueloRepository.existsByCodigoVuelo(vueloDetails.getCodigoVuelo())) {
            throw new ResourceAlreadyExistsException("Ya existe un vuelo con este código");
        }

        vuelo.setCodigoVuelo(vueloDetails.getCodigoVuelo());
        vuelo.setOrigen(vueloDetails.getOrigen());
        vuelo.setDestino(vueloDetails.getDestino());
        vuelo.setFechaSalida(vueloDetails.getFechaSalida());
        vuelo.setFechaLlegada(vueloDetails.getFechaLlegada());
        vuelo.setEstado(vueloDetails.getEstado());
        vuelo.setCapacidad(vueloDetails.getCapacidad());

        return vueloRepository.save(vuelo);
    }

    public void deleteVuelo(Long id) {
        if (!vueloRepository.existsById(id)) {
            throw new ResourceNotFoundException("Vuelo no encontrado con id: " + id);
        }
        vueloRepository.deleteById(id);
    }

    public Optional<Vuelo> findByCodigoVuelo(String codigoVuelo) {
        return vueloRepository.findByCodigoVuelo(codigoVuelo);
    }

    public List<Vuelo> findByOrigenAndDestino(String origen, String destino) {
        return vueloRepository.findByOrigenAndDestino(origen, destino);
    }

    public List<Vuelo> findByEstado(Vuelo.EstadoVuelo estado) {
        return vueloRepository.findByEstado(estado);
    }
}