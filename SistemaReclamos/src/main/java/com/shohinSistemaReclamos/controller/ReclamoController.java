package com.shohinSistemaReclamos.controller;

import com.shohinSistemaReclamos.entity.Volante;
import com.shohinSistemaReclamos.repository.ReclamoRepository;
import com.shohinSistemaReclamos.repository.VolanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.Serializable;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReclamoController implements Serializable{

    @Autowired
    private ReclamoRepository reclamoRepository;

    @Autowired
    private VolanteRepository volanteRepository;

    @PostMapping("/datos")
    public Volante getVolanteByNumeroVolante(@RequestBody Map<String, String> request) {
        String numeroVolante = request.get("numeroVolante");
        System.out.println(numeroVolante+"ajkdjkaskdjasjlkd");
        Volante resultado = volanteRepository.findByNumeroVolante(numeroVolante);
        System.out.println(resultado + " que devuelve ");
        return volanteRepository.findByNumeroVolante(numeroVolante);
    }

    @PostMapping("/grabar")
    public String grabarReclamo(@RequestBody Map<String, String> request){
        System.out.println(request);
        return "hola";
    }

}
