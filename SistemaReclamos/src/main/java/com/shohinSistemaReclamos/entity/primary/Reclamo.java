package com.shohinSistemaReclamos.entity.primary;

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
    @Column(name="estado_carga")
    private String estadoCarga;
    @Column(name = "fecha_envio")
    private Date fechaEnvio;
    @Column(name = "fecha_recepcion")
    private Date fechaRecepcion;
    @Column(name = "fecha_resp_operaciones")
    private Date fechaRespOperaciones;
    @Column(name = "fecha_resp_seguridad")
    private Date fechaRespSeguridad;
    @Column(name="linea_aerea")
    private String lineaAerea;
    private String medio;
    @Column(name = "monto_reclamo")
    private String montoReclamo;
    @Column(name="numero_volante")
    private String numeroVolante;
    private String observaciones;
    @Column(name = "persona_reclamo")
    private String personaReclamo;
    @Column(name = "tipo_reclamo")
    private String tipoReclamo;

    @Column(name = "awb")
    private String guiMaster;

    @Column(name = "hawb")
    private String guiaHija;

    public Reclamo() {
    }


    public Reclamo(String codigo, String observaciones) {
        this.codigo = codigo;
        this.observaciones = observaciones;
    }

    public Reclamo(Long id, String codigo, String descripcion, String estadoCarga, Date fechaEnvio, Date fechaRecepcion, Date fechaRespOperaciones, Date fechaRespSeguridad, String lineaAerea, String medio, String montoReclamo, String numeroVolante, String observaciones, String personaReclamo, String tipoReclamo, String guiMaster, String guiaHija) {
        this.id = id;
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.estadoCarga = estadoCarga;
        this.fechaEnvio = fechaEnvio;
        this.fechaRecepcion = fechaRecepcion;
        this.fechaRespOperaciones = fechaRespOperaciones;
        this.fechaRespSeguridad = fechaRespSeguridad;
        this.lineaAerea = lineaAerea;
        this.medio = medio;
        this.montoReclamo = montoReclamo;
        this.numeroVolante = numeroVolante;
        this.observaciones = observaciones;
        this.personaReclamo = personaReclamo;
        this.tipoReclamo = tipoReclamo;
        this.guiMaster = guiMaster;
        this.guiaHija = guiaHija;
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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstadoCarga() {
        return estadoCarga;
    }

    public void setEstadoCarga(String estadoCarga) {
        this.estadoCarga = estadoCarga;
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

    public Date getFechaRespOperaciones() {
        return fechaRespOperaciones;
    }

    public void setFechaRespOperaciones(Date fechaRespOperaciones) {
        this.fechaRespOperaciones = fechaRespOperaciones;
    }

    public Date getFechaRespSeguridad() {
        return fechaRespSeguridad;
    }

    public void setFechaRespSeguridad(Date fechaRespSeguridad) {
        this.fechaRespSeguridad = fechaRespSeguridad;
    }

    public String getLineaAerea() {
        return lineaAerea;
    }

    public void setLineaAerea(String lineaAerea) {
        this.lineaAerea = lineaAerea;
    }

    public String getMedio() {
        return medio;
    }

    public void setMedio(String medio) {
        this.medio = medio;
    }

    public String getMontoReclamo() {
        return montoReclamo;
    }

    public void setMontoReclamo(String montoReclamo) {
        this.montoReclamo = montoReclamo;
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

    public String getPersonaReclamo() {
        return personaReclamo;
    }

    public void setPersonaReclamo(String personaReclamo) {
        this.personaReclamo = personaReclamo;
    }

    public String getTipoReclamo() {
        return tipoReclamo;
    }

    public void setTipoReclamo(String tipoReclamo) {
        this.tipoReclamo = tipoReclamo;
    }

    public String getGuiMaster() {
        return guiMaster;
    }

    public void setGuiMaster(String guiMaster) {
        this.guiMaster = guiMaster;
    }

    public String getGuiaHija() {
        return guiaHija;
    }

    public void setGuiaHija(String guiaHija) {
        this.guiaHija = guiaHija;
    }
}
