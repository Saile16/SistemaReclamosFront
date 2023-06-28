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
    public List<?> grabar(Reclamo reclamo){
        System.out.println("llama a esto grabar reclamos en service reclamos" + reclamo.getNumeroVolante());

        List<?> lista=reclamoRepository.listar();
        Long contador;
        String tipoReclamo = reclamo.getTipoReclamo();
        String secuencia;
        if(lista.isEmpty()){
            String ultimoReclamo = reclamo.getNumeroVolante();
            contador = 1L;
            secuencia = String.format("TRA-%s-%05d", ultimoReclamo, contador);
            reclamo.setCodigo(secuencia);
        }
        contador = (long) lista.size();
        System.out.println("numero contador : " + contador);
        secuencia = String.format("TRA-%s-%05d", reclamo.getNumeroVolante(), contador+1);
        reclamo.setCodigo(secuencia);
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
    public void generarCodigo(){

    }


}
