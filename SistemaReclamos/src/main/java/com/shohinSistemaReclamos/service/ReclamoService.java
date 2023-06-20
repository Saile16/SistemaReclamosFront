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
        String codigo = "TRA-" + String.format("%06d", codigoContador);
        codigoContador++;
        reclamo.setCodigo(codigo);
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
}
