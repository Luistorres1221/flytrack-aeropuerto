package com.example.backend.controller;

import com.example.backend.models.Aerolinea;
import com.example.backend.models.Vuelo;
import com.example.backend.models.Vuelo.EstadoVuelo;
import com.example.backend.services.VueloService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(VueloController.class)
class VueloControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private VueloService vueloService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetAllVuelos() throws Exception {
        Vuelo vuelo1 = createVuelo("ABC123", "Madrid", "Barcelona");
        vuelo1.setId(1L);
        Vuelo vuelo2 = createVuelo("DEF456", "Barcelona", "Madrid");
        vuelo2.setId(2L);
        List<Vuelo> vuelos = Arrays.asList(vuelo1, vuelo2);

        when(vueloService.getAllVuelos()).thenReturn(vuelos);

        mockMvc.perform(get("/api/vuelos"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].codigoVuelo").value("ABC123"))
                .andExpect(jsonPath("$[1].codigoVuelo").value("DEF456"));

        verify(vueloService, times(1)).getAllVuelos();
    }

    @Test
    void testGetVueloById() throws Exception {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");
        vuelo.setId(1L);

        when(vueloService.getVueloById(1L)).thenReturn(Optional.of(vuelo));

        mockMvc.perform(get("/api/vuelos/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.codigoVuelo").value("ABC123"))
                .andExpect(jsonPath("$.origen").value("Madrid"))
                .andExpect(jsonPath("$.destino").value("Barcelona"));

        verify(vueloService, times(1)).getVueloById(1L);
    }

    @Test
    void testGetVueloByIdNotFound() throws Exception {
        when(vueloService.getVueloById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/vuelos/1"))
                .andExpect(status().isNotFound());

        verify(vueloService, times(1)).getVueloById(1L);
    }

    @Test
    void testCreateVuelo() throws Exception {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");
        vuelo.setId(1L);

        when(vueloService.createVuelo(any(Vuelo.class))).thenReturn(vuelo);

        mockMvc.perform(post("/api/vuelos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(vuelo)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.codigoVuelo").value("ABC123"))
                .andExpect(jsonPath("$.origen").value("Madrid"));

        verify(vueloService, times(1)).createVuelo(any(Vuelo.class));
    }

    @Test
    void testUpdateVuelo() throws Exception {
        Vuelo vuelo = createVuelo("ABC123", "Madrid", "Barcelona");
        vuelo.setId(1L);

        when(vueloService.updateVuelo(eq(1L), any(Vuelo.class))).thenReturn(vuelo);

        mockMvc.perform(put("/api/vuelos/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(vuelo)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.codigoVuelo").value("ABC123"));

        verify(vueloService, times(1)).updateVuelo(eq(1L), any(Vuelo.class));
    }

    @Test
    void testDeleteVuelo() throws Exception {
        doNothing().when(vueloService).deleteVuelo(1L);

        mockMvc.perform(delete("/api/vuelos/1"))
                .andExpect(status().isNoContent());

        verify(vueloService, times(1)).deleteVuelo(1L);
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
        vuelo.setHoraAbordaje(LocalDateTime.now().plusMinutes(30));
        vuelo.setCapacidad(150);

        Aerolinea aerolinea = new Aerolinea();
        aerolinea.setId(1L);
        aerolinea.setNombre("Test Airline");
        aerolinea.setCodigoIata("TA");
        aerolinea.setPais("Colombia");
        vuelo.setAerolinea(aerolinea);

        return vuelo;
    }
}