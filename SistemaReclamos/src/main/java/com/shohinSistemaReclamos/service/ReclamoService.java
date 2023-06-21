package com.shohinSistemaReclamos.service;

import com.shohinSistemaReclamos.entity.Reclamo;
import com.shohinSistemaReclamos.repository.ReclamoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReclamoService {

    @Autowired
    ReclamoRepository reclamoRepository;
    private static int codigoContador = 1;
    @Transactional
    public List<?> grabar(Reclamo reclamo){
        List<?> lista=reclamoRepository.listar();
        System.out.println(lista+"llama a esto ????");
        for ( Object codigoGenerar : lista) {
            System.out.println(codigoGenerar.toString());
        }
        List<?> datos=reclamoRepository.grabar(reclamo);
        return datos;
    }

    @Transactional
    public List<?> listar(){
        List<?> lista=reclamoRepository.listar();
        return lista;
    }

    @Transactional
    public List<?> actualizar(Reclamo reclamo){
        List<?> lista=reclamoRepository.actualizar(reclamo);
        return lista;
    }

    public void generarCodigo(){

    }


}
