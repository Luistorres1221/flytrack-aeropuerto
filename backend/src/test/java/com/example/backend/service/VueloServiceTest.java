package com.example.backend.service;

import com.example.backend.models.Vuelo;
import com.example.backend.models.Vuelo.EstadoVuelo;
import com.example.backend.repository.VueloRepository;
import com.example.backend.services.VueloService;
import com.example.backend.exceptions.ResourceNotFoundException;
import com.example.backend.exceptions.ResourceAlreadyExistsException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VueloServiceTest {

    @Mock
    private VueloRepository vueloRepository;

    @InjectMocks
    private VueloService vueloService;

    @Test
    void testGetAllVuelos() {
        Vuelo vuelo1 = createVuelo("ABC123", "Madrid", "Barcelona");
        Vuelo vuelo2 = createVuelo("DEF456", "Barcelona", "Madrid");
        List<Vuelo> vuelos = Arrays.asList(vuelo1, vuelo2);

        when(vueloRepository.findAll()).thenReturn(vuelos);

        List<Vuelo> result = vueloService.getAllVuelos();

        assertEquals(2, result.size());
        verify(vueloRepository, times(1)).findAll();
    }

    @Test
    void testGetVueloById() {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");
        vuelo.setId(1L);

        when(vueloRepository.findById(1L)).thenReturn(Optional.of(vuelo));

        Optional<Vuelo> result = vueloService.getVueloById(1L);

        assertTrue(result.isPresent());
        assertEquals("ABC123", result.get().getCodigoVuelo());
        verify(vueloRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateVuelo() {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");

        when(vueloRepository.existsByCodigoVuelo("ABC123")).thenReturn(false);
        when(vueloRepository.save(vuelo)).thenReturn(vuelo);

        Vuelo result = vueloService.createVuelo(vuelo);

        assertEquals("ABC123", result.getCodigoVuelo());
        verify(vueloRepository, times(1)).existsByCodigoVuelo("ABC123");
        verify(vueloRepository, times(1)).save(vuelo);
    }

    @Test
    void testCreateVueloAlreadyExists() {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");

        when(vueloRepository.existsByCodigoVuelo("ABC123")).thenReturn(true);

        assertThrows(ResourceAlreadyExistsException.class, () -> vueloService.createVuelo(vuelo));
        verify(vueloRepository, times(1)).existsByCodigoVuelo("ABC123");
        verify(vueloRepository, never()).save(any());
    }

    @Test
    void testUpdateVuelo() {
        Vuelo existingVuelo = createVuelo("ABC123", "Madrid", "Barcelona");
        existingVuelo.setId(1L);
        Vuelo updatedDetails = createVuelo("XYZ789", "Valencia", "Sevilla");

        when(vueloRepository.findById(1L)).thenReturn(Optional.of(existingVuelo));
        when(vueloRepository.existsByCodigoVuelo("XYZ789")).thenReturn(false);
        when(vueloRepository.save(any(Vuelo.class))).thenReturn(existingVuelo);

        Vuelo result = vueloService.updateVuelo(1L, updatedDetails);

        assertEquals("XYZ789", result.getCodigoVuelo());
        assertEquals("Valencia", result.getOrigen());
        assertEquals("Sevilla", result.getDestino());
        verify(vueloRepository, times(1)).findById(1L);
        verify(vueloRepository, times(1)).save(existingVuelo);
    }

    @Test
    void testUpdateVueloNotFound() {
        Vuelo updatedDetails = createVuelo("XYZ789", "Valencia", "Sevilla");

        when(vueloRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> vueloService.updateVuelo(1L, updatedDetails));
        verify(vueloRepository, times(1)).findById(1L);
        verify(vueloRepository, never()).save(any());
    }

    @Test
    void testDeleteVuelo() {
        when(vueloRepository.existsById(1L)).thenReturn(true);

        vueloService.deleteVuelo(1L);

        verify(vueloRepository, times(1)).existsById(1L);
        verify(vueloRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteVueloNotFound() {
        when(vueloRepository.existsById(1L)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> vueloService.deleteVuelo(1L));
        verify(vueloRepository, times(1)).existsById(1L);
        verify(vueloRepository, never()).deleteById(any());
    }

    private Vuelo createVuelo(String codigo, String origen, String destino) {
        Vuelo vuelo = new Vuelo();
        vuelo.setCodigoVuelo(codigo);
        vuelo.setOrigen(origen);
        vuelo.setDestino(destino);
        vuelo.setFechaSalida(LocalDateTime.now());
        vuelo.setFechaLlegada(LocalDateTime.now().plusHours(2));
        vuelo.setEstado(EstadoVuelo.PROGRAMADO);
        vuelo.setPuerta("A1");
        vuelo.setTerminal("T1");
        vuelo.setAerolinea("Test Airline");
        return vuelo;
    }
}