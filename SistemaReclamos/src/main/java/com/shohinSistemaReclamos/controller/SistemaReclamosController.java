package com.shohinSistemaReclamos.controller;

import com.shohinSistemaReclamos.entity.Reclamo;
import com.shohinSistemaReclamos.repository.ReclamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SistemaReclamosController {

    @Autowired
    ReclamoRepository reclamoRepository;

    @PostMapping("/ingresar-reclamo")
    public ResponseEntity<?> ingresarReclamo(@RequestBody Reclamo reclamo){
        System.out.println("llama a la funcion ??");
        System.out.println(reclamo.getTipoReclamo()+"lo llama ???");
        Reclamo reclamoHecho= reclamoRepository.save(reclamo);
        return ResponseEntity.ok(reclamoHecho);
    }
}
