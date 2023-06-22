package com.shohinSistemaReclamos.entity.second;

import jakarta.persistence.*;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.Date;

@Entity
public class Volante {

    private String almacen;

    @Id
    @Column(name = "numero")
    private String numeroVolante;
    @Column(name = "awb")
    private String guiaMaster;

    @Column(name = "hawb")
    private String guiaHija;

    @Column(name = "des_aerolinea")
    private String lineaAerea;

    @Column(name = "nombre_consignatario")
    private String nombreConsignatario;

    @Column(name = "des_agente")
    private String agenteCarga;

    @Column(name = "des_agente_aduana")
    private String agenteAduana;

    @Column(name = "tipo_ingreso")
    private Character tipoIngreso;

    @Column(name = "fecha_vuelo")
    private Date fechaVuelo;

    @Column(name = "numero_vuelo")
    private String numeroVuelo;

    public Volante() {
    }
    public Volante(String numeroVolante, String guiaMaster, String guiaHija, String lineaAerea, String nombreConsignatario, String agenteCarga, String agenteAduana, Character tipoIngreso, Date fechaVuelo, String numeroVuelo) {
        this.numeroVolante = numeroVolante;
        this.guiaMaster = guiaMaster;
        this.guiaHija = guiaHija;
        this.lineaAerea = lineaAerea;
        this.nombreConsignatario = nombreConsignatario;
        this.agenteCarga = agenteCarga;
        this.agenteAduana = agenteAduana;
        this.tipoIngreso = tipoIngreso;
        this.fechaVuelo = fechaVuelo;
        this.numeroVuelo = numeroVuelo;
    }

    public String getAlmacen() {
        return almacen;
    }

    public void setAlmacen(String almacen) {
        this.almacen = almacen;
    }

    public String getNumeroVolante() {
        return numeroVolante;
    }

    public void setNumeroVolante(String numeroVolante) {
        this.numeroVolante = numeroVolante;
    }

    public String getNombreConsignatario() {
        return nombreConsignatario;
    }

    public void setNombreConsignatario(String nombreConsignatario) {
        this.nombreConsignatario = nombreConsignatario;
    }

    public String getAgenteCarga() {
        return agenteCarga;
    }

    public void setAgenteCarga(String agenteCarga) {
        this.agenteCarga = agenteCarga;
    }

    public String getLineaAerea() {
        return lineaAerea;
    }

    public void setLineaAerea(String lineaAerea) {
        this.lineaAerea = lineaAerea;
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

    public String getAgenteAduana() {
        return agenteAduana;
    }

    public void setAgenteAduana(String agenteAduana) {
        this.agenteAduana = agenteAduana;
    }

    public Character getTipoIngreso() {
        return tipoIngreso;
    }

    public void setTipoIngreso(Character tipoIngreso) {
        this.tipoIngreso = tipoIngreso;
    }

    public Date getFechaVuelo() {
        return fechaVuelo;
    }

    public void setFechaVuelo(Date fechaVuelo) {
        this.fechaVuelo = fechaVuelo;
    }

    public String getNumeroVuelo() {
        return numeroVuelo;
    }

    public void setNumeroVuelo(String numeroVuelo) {
        this.numeroVuelo = numeroVuelo;
    }
}
