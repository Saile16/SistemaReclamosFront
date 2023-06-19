package com.shohinSistemaReclamos.entity;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "volantes")
public class Volante implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String medio;
    private String lineaAerea;
    private String estadoCarga;
    private String dni;
    private String ruc;
    @Column(name = "numero_volante")
    private String numeroVolante;

    public Volante() {
    }

    public Volante(Long id, String medio, String lineaAerea, String estadoCarga, String dni, String ruc, String numeroVolante) {
        this.id = id;
        this.medio = medio;
        this.lineaAerea = lineaAerea;
        this.estadoCarga = estadoCarga;
        this.dni = dni;
        this.ruc = ruc;
        this.numeroVolante = numeroVolante;
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
