package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "vuelos")
public class Vuelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El código de vuelo es obligatorio")
    @Size(min = 3, max = 10, message = "El código de vuelo debe tener entre 3 y 10 caracteres")
    @Column(unique = true)
    private String codigoVuelo;

    @NotBlank(message = "El origen es obligatorio")
    @Size(min = 2, max = 100, message = "El origen debe tener entre 2 y 100 caracteres")
    private String origen;

    @NotBlank(message = "El destino es obligatorio")
    @Size(min = 2, max = 100, message = "El destino debe tener entre 2 y 100 caracteres")
    private String destino;

    @NotNull(message = "La fecha de salida es obligatoria")
    private LocalDateTime fechaSalida;

    @NotNull(message = "La fecha de llegada es obligatoria")
    private LocalDateTime fechaLlegada;

    @NotNull(message = "El estado es obligatorio")
    @Enumerated(EnumType.STRING)
    private EstadoVuelo estado;

    @NotBlank(message = "La puerta es obligatoria")
    @Size(min = 1, max = 10, message = "La puerta debe tener entre 1 y 10 caracteres")
    @Column(name = "puerta")
    private String puerta;

    @NotBlank(message = "La terminal es obligatoria")
    @Size(min = 1, max = 20, message = "La terminal debe tener entre 1 y 20 caracteres")
    @Column(name = "terminal")
    private String terminal;

    @NotNull(message = "La hora de abordaje es obligatoria")
    @Column(name = "hora_abordaje")
    private LocalDateTime horaAbordaje;
    @NotBlank(message = "La aerolínea es obligatoria")
    @Size(min = 2, max = 50, message = "La aerolínea debe tener entre 2 y 50 caracteres")
    @Column(name = "aerolinea")
    private String aerolinea;
    @Min(value = 1, message = "La capacidad debe ser al menos 1")
    private Integer capacidad;

    @OneToMany(mappedBy = "vuelo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Pasajero> pasajeros;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    @Column(nullable = false)
    private LocalDateTime fechaActualizacion;

    @PrePersist
    protected void onCreate() {
        fechaCreacion = LocalDateTime.now();
        fechaActualizacion = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    public enum EstadoVuelo {
        PROGRAMADO, EN_VUELO, ABORDANDO, RETRASADO, CANCELADO, COMPLETADO
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoVuelo() {
        return codigoVuelo;
    }

    public void setCodigoVuelo(String codigoVuelo) {
        this.codigoVuelo = codigoVuelo;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public LocalDateTime getFechaSalida() {
        return fechaSalida;
    }

    public void setFechaSalida(LocalDateTime fechaSalida) {
        this.fechaSalida = fechaSalida;
    }

    public LocalDateTime getFechaLlegada() {
        return fechaLlegada;
    }

    public void setFechaLlegada(LocalDateTime fechaLlegada) {
        this.fechaLlegada = fechaLlegada;
    }

    public EstadoVuelo getEstado() {
        return estado;
    }

    public void setEstado(EstadoVuelo estado) {
        this.estado = estado;
    }

    public String getPuerta() {
        return puerta;
    }

    public void setPuerta(String puerta) {
        this.puerta = puerta;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public LocalDateTime getHoraAbordaje() {
        return horaAbordaje;
    }

    public void setHoraAbordaje(LocalDateTime horaAbordaje) {
        this.horaAbordaje = horaAbordaje;
    }

    public String getAerolinea() {
        return aerolinea;
    }

    public void setAerolinea(String aerolinea) {
        this.aerolinea = aerolinea;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public List<Pasajero> getPasajeros() {
        return pasajeros;
    }

    public void setPasajeros(List<Pasajero> pasajeros) {
        this.pasajeros = pasajeros;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public LocalDateTime getFechaActualizacion() {
        return fechaActualizacion;
    }

    public void setFechaActualizacion(LocalDateTime fechaActualizacion) {
        this.fechaActualizacion = fechaActualizacion;
    }
}