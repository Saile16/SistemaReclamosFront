package com.shohinSistemaReclamos.repository;

import com.shohinSistemaReclamos.entity.Volante;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
public class VolanteRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Volante> datosVolante(Volante volante) {
        String sql = (
                "select * from volantes "
        );
        String where="";
        if(volante.getNumeroVolante()!=null){
            where += (where.length() == 0 ? " where " : " and ") + " numero_volante ='" + volante.getNumeroVolante() + "'";
        }
        System.out.println(sql+ "cuantas veces");
        Query query = em.createNativeQuery(sql + where);
        List<Object[]> lista = query.getResultList();
        em.close();

        return lista.stream()
                .map(t -> new Volante(
                        (Long) t[0], (String) t[1], (String) t[2], (String) t[3], (String) t[4], (String) t[5], (String) t[6]
                ))
                .collect(Collectors.toList());

    }
}
