package com.shohinSistemaReclamos.entity;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "reclamos")
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String descripcion;
    @Column(name = "tipo_reclamo")
    private String tipoReclamo;
    @Column(name = "fecha_inicio")
    private Date fechaInicio;
    @Column(name="ruc_usuario")
    private String rucUsuario;

    @Column(name="numero_volante")
    private Integer numeroVolante;

    public Reclamo() {
    }

    public Reclamo(String descripcion, String tipoReclamo, Date fechaInicio, String rucUsuario,Integer numeroVolante) {
        this.descripcion = descripcion;
        this.tipoReclamo = tipoReclamo;
        this.fechaInicio = fechaInicio;
        this.rucUsuario = rucUsuario;
        this.numeroVolante=numeroVolante;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoReclamo() {
        return tipoReclamo;
    }

    public void setTipoReclamo(String tipoReclamo) {
        this.tipoReclamo = tipoReclamo;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getRucUsuario() {
        return rucUsuario;
    }

    public void setRucUsuario(String rucUsuario) {
        this.rucUsuario = rucUsuario;
    }

    public Integer getNumeroVolante() {
        return numeroVolante;
    }

    public void setNumeroVolante(Integer numeroVolante) {
        this.numeroVolante = numeroVolante;
    }
}
