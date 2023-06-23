package com.shohinSistemaReclamos.service;

import com.shohinSistemaReclamos.entity.second.Volante;
import com.shohinSistemaReclamos.repository.second.VolanteRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VolanteService {

    @Autowired
    VolanteRepository volanteRepository;
    @Transactional(transactionManager ="ShohinTransactionManager")
    public List<Volante> datosVolante(Volante volante){
        List<Volante> datos=volanteRepository.datosVolante(volante);
        return datos;
    }

}
