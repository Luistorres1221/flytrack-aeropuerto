package com.example.backend.services;

import com.example.backend.models.Aerolinea;
import com.example.backend.repositories.AerolineaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AerolineaService {

    @Autowired
    private AerolineaRepository aerolineaRepository;

    public List<Aerolinea> findAll() {
        return aerolineaRepository.findAll();
    }

    public Optional<Aerolinea> findById(Long id) {
        return aerolineaRepository.findById(id);
    }

    public Aerolinea save(Aerolinea aerolinea) {
        return aerolineaRepository.save(aerolinea);
    }

    public void deleteById(Long id) {
        aerolineaRepository.deleteById(id);
    }
}