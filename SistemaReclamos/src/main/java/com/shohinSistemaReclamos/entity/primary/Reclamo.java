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
    @Column(name="bulto_mal_estado")
    private String estadoCarga;
    @Column(name = "fecha_envio")
    private Date fechaEnvio;
    @Column(name = "fecha_recepcion")
    private Date fechaRecepcion;

    @Column(name = "user_seguridad")
    private String userSeguridad;
    @Column(name = "fecha_resp_seguridad")
    private Date fechaRespSeguridad;

    @Column(name = "user_operaciones")
    private String userOperaciones;
    @Column(name = "fecha_resp_operaciones")
    private Date fechaRespOperaciones;
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
    private String guiaMaster;

    @Column(name = "hawb")
    private String guiaHija;

    private Character estado;

    @Column(name = "fecha_vuelo")
    private Date fechaVuelo;

    @Column(name = "fecha_cierre")
    private Date fechaCierre;

    @Column(name = "importador")
    private String nombreConsignatario;

    @Column(name = "agente_aduana")
    private String agenteAduana;

    @Column(name = "agente_carga")
    private String agenteCarga;

    @Column(name = "fecha_resp_legal")
    private Date fechaRespLegal;

    @Column(name = "fecha_recepcion_cliente")
    private Date fechaRecepcionCliente;

    @Column(name = "motivo_reclamo")
    private String motivoReclamo;
    public Reclamo() {
    }


    public Reclamo(Long id, String codigo, Date fechaEnvio, Date fechaRecepcion, Date fechaRespSeguridad, Date fechaRespOperaciones, String observaciones, Character estado,String numeroVolante,Date fechaRespLegal,Date fechaCierre,Date fechaRecepcionCliente) {
        this.id = id;
        this.codigo = codigo;
        this.fechaEnvio = fechaEnvio;
        this.fechaRecepcion = fechaRecepcion;
        this.fechaRespSeguridad = fechaRespSeguridad;
        this.fechaRespOperaciones = fechaRespOperaciones;
        this.observaciones = observaciones;
        this.estado = estado;
        this.numeroVolante=numeroVolante;
        this.fechaRespLegal=fechaRespLegal;
        this.fechaCierre=fechaCierre;
        this.fechaRecepcionCliente=fechaRecepcionCliente;
    }

    /*public Reclamo(Long id, String codigo, String descripcion, String estadoCarga, Date fechaEnvio, Date fechaRecepcion, Date fechaRespOperaciones, Date fechaRespSeguridad, String lineaAerea, String medio, String montoReclamo,
                       String numeroVolante, String observaciones, String personaReclamo, String tipoReclamo, String guiaMaster, String guiaHija,Character estado) {
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
            this.guiaMaster = guiaMaster;
            this.guiaHija = guiaHija;
            this.estado=estado;
        }
    */
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

    public String getUserSeguridad() {
        return userSeguridad;
    }

    public void setUserSeguridad(String userSeguridad) {
        this.userSeguridad = userSeguridad;
    }

    public Date getFechaRespSeguridad() {
        return fechaRespSeguridad;
    }

    public void setFechaRespSeguridad(Date fechaRespSeguridad) {
        this.fechaRespSeguridad = fechaRespSeguridad;
    }

    public String getUserOperaciones() {
        return userOperaciones;
    }

    public void setUserOperaciones(String userOperaciones) {
        this.userOperaciones = userOperaciones;
    }

    public Date getFechaRespOperaciones() {
        return fechaRespOperaciones;
    }

    public void setFechaRespOperaciones(Date fechaRespOperaciones) {
        this.fechaRespOperaciones = fechaRespOperaciones;
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

    public String getGuiaMaster() {
        return guiaMaster;
    }

    public void setGuiaMaster(String guiaMaster) {
        this.guiaMaster = guiaMaster;
    }

    public String getGuiaHija() {
        return guiaHija;
    }

    public void setGuiaHija(String guiaHija) {
        this.guiaHija = guiaHija;
    }

    public Character getEstado() {
        return estado;
    }

    public void setEstado(Character estado) {
        this.estado = estado;
    }

    public Date getFechaVuelo() {
        return fechaVuelo;
    }

    public void setFechaVuelo(Date fechaVuelo) {
        this.fechaVuelo = fechaVuelo;
    }

    public Date getFechaCierre() {
        return fechaCierre;
    }

    public void setFechaCierre(Date fechaCierre) {
        this.fechaCierre = fechaCierre;
    }

    public String getNombreConsignatario() {
        return nombreConsignatario;
    }

    public void setNombreConsignatario(String nombreConsignatario) {
        this.nombreConsignatario = nombreConsignatario;
    }

    public String getAgenteAduana() {
        return agenteAduana;
    }

    public void setAgenteAduana(String agenteAduana) {
        this.agenteAduana = agenteAduana;
    }

    public String getAgenteCarga() {
        return agenteCarga;
    }

    public void setAgenteCarga(String agenteCarga) {
        this.agenteCarga = agenteCarga;
    }

    public Date getFechaRespLegal() {
        return fechaRespLegal;
    }

    public void setFechaRespLegal(Date fechaRespLegal) {
        this.fechaRespLegal = fechaRespLegal;
    }

    public Date getFechaRecepcionCliente() {
        return fechaRecepcionCliente;
    }

    public void setFechaRecepcionCliente(Date fechaRecepcionCliente) {
        this.fechaRecepcionCliente = fechaRecepcionCliente;
    }

    public String getMotivoReclamo() {
        return motivoReclamo;
    }

    public void setMotivoReclamo(String motivoReclamo) {
        this.motivoReclamo = motivoReclamo;
    }
}
