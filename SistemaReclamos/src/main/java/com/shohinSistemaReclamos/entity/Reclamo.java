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
    @Column(name = "tipo_reclamo")
    private String tipoReclamo;

    @Column(name = "persona_reclamo")
    private String personaReclamo;

    private String nombre;
    @Column(name = "fecha_recepcion")
    private Date fechaRecepcion;

    @Column(name = "monto_reclamo")
    private String montoReclamo;

    @Column(name = "descripcion")
    private String descripcion;
    private String medio;
    @Column(name="linea_aerea")
    private String lineaAerea;
    @Column(name="estado_carga")
    private String estadoCarga;

    private String dni;
    private String ruc;
    @Column(name="numero_volante")
    private String numeroVolante;

    public Reclamo() {
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
}
