package com.shohinSistemaReclamos.repository.second;

import com.shohinSistemaReclamos.entity.second.Volante;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class VolanteRepository {

    @PersistenceContext
    private EntityManager em;


    public List<Volante> datosVolante(Volante volante) {
        String dteer="";
        if(volante.getAlmacen().equals("DTEER")){
            dteer="dteer_";
        }
        String sql = (
                "select v.numero,v.awb,v.hawb,mv.des_aerolinea,g.nombre_consignatario,a.nombre_consignatario as des_agente,v.des_agente_aduana,mv.tipo_ingreso,mv.fecha_vuelo,mv.numero_vuelo " +
                        "from (select * from "+dteer+"volante as v where numero='"+volante.getNumeroVolante()+"') as v \n" +
                        "inner join "+dteer+"manifiesto_cabe as mv on v.periodo=mv.periodo and v.manifiesto=mv.numero \n" +
                        "inner join "+dteer+"manifiesto_deta as md on v.periodo=md.periodo and v.manifiesto=md.numero and v.awb=md.awb and  v.hawb=md.hawb \n" +
                        "inner join "+dteer+"guia_tarja as g on v.awb=g.awb and v.hawb=g.hawb inner join "+dteer+"guia_tarja as a on v.awb=a.awb and a.hawb='' \n" +
                        "left join adu_datos_acceso_operador as t on md.cod_almacen=t.codigo_aduana"
        );
        System.out.println(sql+" cuantas veces");
        Query query = em.createNativeQuery(sql );
        List<Object[]> lista = query.getResultList();
        em.close();

        return lista.stream()
                .map(t -> new Volante(
                        //(Long) t[0], (String) t[1], (String) t[2], (String) t[3], (String) t[4], (String) t[5], (String) t[6]
                        (String) t[0], (String) t[1], (String) t[2], (String) t[3], (String) t[4], (String) t[5],(String) t[6],(Character) t[7],(Date) t[8],(String) t[9]
                ))
                .collect(Collectors.toList());

    }
}
