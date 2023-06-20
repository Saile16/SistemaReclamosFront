package com.shohinSistemaReclamos.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reclamo")
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String codigo;
    @Column(name = "descripcion")
    private String descripcion;
    private String dni;
    @Column(name="estado_carga")
    private String estadoCarga;


    @Column(name = "fecha_recepcion")
    private Date fechaRecepcion;
    @Column(name="linea_aerea")
    private String lineaAerea;
    private String medio;
    @Column(name = "monto_reclamo")
    private String montoReclamo;
    private String nombre;
    @Column(name="numero_volante")
    private String numeroVolante;
    @Column(name = "persona_reclamo")
    private String personaReclamo;
    private String ruc;
    @Column(name = "tipo_reclamo")
    private String tipoReclamo;
    private String observaciones;
    @Column(name = "fecha_envio")
    private Date fechaEnvio;

    @Column(name = "fecha_resp_seguridad")
    private Date fechaRespSeguridad;

    @Column(name = "fecha_resp_operaciones")
    private Date fechaRespOperaciones;
    public Reclamo() {
    }

    public Reclamo(String codigo, String observaciones) {
        this.codigo = codigo;
        this.observaciones = observaciones;
    }

    public Reclamo(Long id, String codigo, String descripcion, String dni, String estadoCarga, Date fechaRecepcion, String lineaAerea, String medio, String montoReclamo, String nombre,
                   String numeroVolante, String personaReclamo, String ruc, String tipoReclamo, String observaciones,Date fechaEnvio,Date fechaRespSeguridad,Date fechaRespOperaciones) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.dni = dni;
        this.estadoCarga = estadoCarga;
        this.fechaRecepcion = fechaRecepcion;
        this.lineaAerea = lineaAerea;
        this.medio = medio;
        this.montoReclamo = montoReclamo;
        this.nombre = nombre;
        this.numeroVolante = numeroVolante;
        this.personaReclamo = personaReclamo;
        this.ruc = ruc;
        this.tipoReclamo = tipoReclamo;
        this.observaciones = observaciones;
        this.fechaEnvio = fechaEnvio;
        this.fechaRespSeguridad=fechaRespSeguridad;
        this.fechaRespOperaciones=fechaRespOperaciones;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipoReclamo() {
        return tipoReclamo;
    }

    public void setTipoReclamo(String tipoReclamo) {
        this.tipoReclamo = tipoReclamo;
    }

    public String getPersonaReclamo() {
        return personaReclamo;
    }

    public void setPersonaReclamo(String personaReclamo) {
        this.personaReclamo = personaReclamo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Date getFechaEnvio() {
        return fechaEnvio;
    }

    public void setFechaEnvio(Date fechaEnvio) {
        this.fechaEnvio = fechaEnvio;
    }

    public Date getFechaRecepcion() {
        return fechaRecepcion;
    }

    public void setFechaRecepcion(Date fechaRecepcion) {
        this.fechaRecepcion = fechaRecepcion;
    }

    public String getMontoReclamo() {
        return montoReclamo;
    }

    public void setMontoReclamo(String montoReclamo) {
        this.montoReclamo = montoReclamo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getMedio() {
        return medio;
    }

    public void setMedio(String medio) {
        this.medio = medio;
    }

    public String getLineaAerea() {
        return lineaAerea;
    }

    public void setLineaAerea(String lineaAerea) {
        this.lineaAerea = lineaAerea;
    }

    public String getEstadoCarga() {
        return estadoCarga;
    }

    public void setEstadoCarga(String estadoCarga) {
        this.estadoCarga = estadoCarga;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getRuc() {
        return ruc;
    }

    public void setRuc(String ruc) {
        this.ruc = ruc;
    }

    public String getNumeroVolante() {
        return numeroVolante;
    }

    public void setNumeroVolante(String numeroVolante) {
        this.numeroVolante = numeroVolante;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public Date getFechaRespSeguridad() {
        return fechaRespSeguridad;
    }

    public Date getFechaRespOperaciones() {
        return fechaRespOperaciones;
    }

    public void setFechaRespOperaciones(Date fechaRespOperaciones) {
        this.fechaRespOperaciones = fechaRespOperaciones;
    }

    public void setFechaRespSeguridad(Date fechaRespSeguridad) {
        this.fechaRespSeguridad = fechaRespSeguridad;


    }
}
