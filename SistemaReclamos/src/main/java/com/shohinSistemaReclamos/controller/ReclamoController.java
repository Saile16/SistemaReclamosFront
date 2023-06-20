package com.shohinSistemaReclamos.controller;

import com.shohinSistemaReclamos.entity.Reclamo;
import com.shohinSistemaReclamos.entity.Volante;
import com.shohinSistemaReclamos.repository.ReclamoRepository;
import com.shohinSistemaReclamos.service.ReclamoService;
import com.shohinSistemaReclamos.service.VolanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ReclamoController {

    @Autowired
    VolanteService volanteService;

    @Autowired
    ReclamoService reclamoService;

    @PostMapping(value="/datos")
    public ResponseEntity<?> listar(
            @RequestBody Volante volante
    ){
        Map<String,Object> response = new HashMap<>();
        try{
            List<Volante> listaDocumento=volanteService.datosVolante(volante);
            if(listaDocumento.isEmpty()){
                response.put("Mensaje","No existen datos en esa fecha");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(listaDocumento,HttpStatus.OK);

        }
        catch (DataAccessException e){
            response.put("Mensaje","Error al consultar los datos");
            response.put("Error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        }
    }
    @PostMapping(value="/reclamos")
    public ResponseEntity<?> grabarReclamo(
            @RequestBody Reclamo reclamo
            ){
        Map<String,Object> response = new HashMap<>();
        try{
            List<?> reclamos=reclamoService.grabar(reclamo);
            if(reclamos.isEmpty()){
                response.put("Mensaje","No existen datos en esa fecha");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(reclamos,HttpStatus.OK);

        }
        catch (DataAccessException e){
            response.put("Mensaje","Error al consultar los datos");
            response.put("Error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<?> listar(){
        Map<String,Object> response = new HashMap<>();
        try{
            List<?> listaReclamo=reclamoService.listar();
            if(listaReclamo.isEmpty()){
                response.put("Mensaje","No existen datos en esa fecha");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            return new ResponseEntity<>(listaReclamo,HttpStatus.OK);

        }
        catch (DataAccessException e){
            response.put("Mensaje","Error al consultar los datos");
            response.put("Error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<?> actualizar(@RequestBody Reclamo reclamo){
        Map<String,Object> response = new HashMap<>();
        try{
            List<?> listaReclamo=reclamoService.actualizar(reclamo);
            if(listaReclamo.isEmpty()){
                response.put("Mensaje","No existen datos");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(listaReclamo,HttpStatus.OK);
        }
        catch (DataAccessException e){
            response.put("Mensaje","Error al consultar los datos");
            response.put("Error",e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<>(response, HttpStatus.NOT_ACCEPTABLE);
        }
    }

}
