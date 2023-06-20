package com.shohinSistemaReclamos.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "volantes")
public class Volante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dni;
    private String estadoCarga;
    private String lineaAerea;

    private String medio;
    @Column(name = "numero_volante")
    private String numeroVolante;

    private String ruc;


    public Volante() {
    }

    public Volante(Long id, String dni, String estadoCarga, String lineaAerea, String medio, String numeroVolante, String ruc) {
        this.id = id;
        this.dni = dni;
        this.estadoCarga = estadoCarga;
        this.lineaAerea = lineaAerea;
        this.medio = medio;
        this.numeroVolante = numeroVolante;
        this.ruc = ruc;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
