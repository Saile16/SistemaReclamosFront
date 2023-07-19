package com.shohinSistemaReclamos.service;

import com.shohinSistemaReclamos.entity.primary.Reclamo;
import com.shohinSistemaReclamos.repository.primary.ReclamoRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class ReclamoService {

    @Autowired
    ReclamoRepository reclamoRepository;

    @Transactional
    public String obtenerCodigo(Reclamo reclamo){
        System.out.println(reclamo.getTipoReclamo()+" Imprime el tipo de reclamo???'");
       String codigo=reclamoRepository.obtenerCodigo(reclamo);
        return codigo;
    }
    @Transactional
    public List<?> grabar(Reclamo reclamo){
        System.out.println("llama a esto grabar reclamos en service reclamos" + reclamo.getNumeroVolante());
        String codigo= obtenerCodigo(reclamo);
        System.out.println("que tipo es " + codigo);
        reclamo.setCodigo(codigo);
        List<?> datos=reclamoRepository.grabar(reclamo);
        return datos;
    }

    @Transactional
    public List<?> listar(){
        System.out.println("llama a esto ");
        List<?> lista=reclamoRepository.listar();
        return lista;
    }

    @Transactional
    public List<?> actualizar(Reclamo reclamo){
        System.out.println("tlegal???? : " + reclamo.getFechaRecepcionCliente());
        List<?> lista=reclamoRepository.actualizar(reclamo);
        return lista;
    }

    @Transactional
    public List<?> detalleReclamo(Reclamo reclamo){
        List<?> lista= reclamoRepository.detalleReclamo(reclamo);
        return lista;
    }

}
