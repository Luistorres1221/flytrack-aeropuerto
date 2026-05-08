package com.example.backend.services;

import com.example.backend.models.Pasajero;
import com.example.backend.repository.PasajeroRepository;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.exceptions.ResourceAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PasajeroService {

    @Autowired
    private PasajeroRepository pasajeroRepository;

    public List<Pasajero> getAllPasajeros() {
        return pasajeroRepository.findAll();
    }

    public Optional<Pasajero> getPasajeroById(Long id) {
        return pasajeroRepository.findById(id);
    }

    public Pasajero createPasajero(Pasajero pasajero) {
        if (pasajeroRepository.existsByEmail(pasajero.getEmail())) {
            throw new ResourceAlreadyExistsException("Ya existe un pasajero con este email");
        }
        if (pasajeroRepository.existsByNumeroPasaporte(pasajero.getNumeroPasaporte())) {
            throw new ResourceAlreadyExistsException("Ya existe un pasajero con este número de pasaporte");
        }
        return pasajeroRepository.save(pasajero);
    }

    public Pasajero updatePasajero(Long id, Pasajero pasajeroDetails) {
        Pasajero pasajero = pasajeroRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Pasajero no encontrado con id: " + id));

        // Verificar unicidad si se cambia email o pasaporte
        if (!pasajero.getEmail().equals(pasajeroDetails.getEmail()) &&
            pasajeroRepository.existsByEmail(pasajeroDetails.getEmail())) {
            throw new ResourceAlreadyExistsException("Ya existe un pasajero con este email");
        }
        if (!pasajero.getNumeroPasaporte().equals(pasajeroDetails.getNumeroPasaporte()) &&
            pasajeroRepository.existsByNumeroPasaporte(pasajeroDetails.getNumeroPasaporte())) {
            throw new ResourceAlreadyExistsException("Ya existe un pasajero con este número de pasaporte");
        }

        pasajero.setNombre(pasajeroDetails.getNombre());
        pasajero.setApellido(pasajeroDetails.getApellido());
        pasajero.setEmail(pasajeroDetails.getEmail());
        pasajero.setTelefono(pasajeroDetails.getTelefono());
        pasajero.setNumeroPasaporte(pasajeroDetails.getNumeroPasaporte());

        return pasajeroRepository.save(pasajero);
    }

    public void deletePasajero(Long id) {
        if (!pasajeroRepository.existsById(id)) {
            throw new ResourceNotFoundException("Pasajero no encontrado con id: " + id);
        }
        pasajeroRepository.deleteById(id);
    }

    public Optional<Pasajero> findByEmail(String email) {
        return pasajeroRepository.findByEmail(email);
    }

    public Optional<Pasajero> findByNumeroPasaporte(String numeroPasaporte) {
        return pasajeroRepository.findByNumeroPasaporte(numeroPasaporte);
    }
}