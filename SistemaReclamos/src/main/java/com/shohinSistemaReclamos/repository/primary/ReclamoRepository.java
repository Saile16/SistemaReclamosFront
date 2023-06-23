package com.shohinSistemaReclamos.repository.primary;

import com.shohinSistemaReclamos.entity.primary.Reclamo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class ReclamoRepository {
    @PersistenceContext
    private EntityManager em;

    public List<?> grabar(Reclamo reclamo) {
        em.createNativeQuery("INSERT INTO reclamo (codigo,descripcion,estado_carga,fecha_envio,fecha_recepcion,linea_aerea,medio,monto_reclamo,numero_volante,tipo_reclamo,awb,hawb) " +
                        "VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?)")
                .setParameter(1,reclamo.getCodigo())
                .setParameter(2,reclamo.getDescripcion())
                .setParameter(3,reclamo.getEstadoCarga())
                .setParameter(4,reclamo.getFechaEnvio())
                .setParameter(5,reclamo.getFechaRecepcion())
                .setParameter(6,reclamo.getLineaAerea())
                .setParameter(7,reclamo.getMedio())
                .setParameter(8,reclamo.getMontoReclamo())
                .setParameter(9,reclamo.getNumeroVolante())
                .setParameter(10,reclamo.getTipoReclamo())
                .setParameter(11,reclamo.getGuiMaster())
                .setParameter(12,reclamo.getGuiaHija())
                .executeUpdate();
        em.close();
        return Collections.singletonList(1);

    }

    public List<?> listar(){
        String sql = (
                "select * from reclamo "
        );
        String orderBy = "";
        orderBy += " order by id";

        Query query = em.createNativeQuery(sql + orderBy);
        List<Object[]> lista = query.getResultList();
        System.out.println("cual es el sql " + sql + orderBy);
        em.close();
        return lista.stream()
                .map(t -> new Reclamo(
                        (Long) t[0], (String) t[1], (String) t[2], (String) t[3], (Date) t[4], (Date) t[5], (Date) t[6], (Date) t[7], (String) t[8], (String) t[9], (String) t[10], (String) t[11], (String) t[12],
                        (String) t[13], (String) t[14], (String) t[15], (String) t[16]
                ))
                .collect(Collectors.toList());
    }

    public List<?> actualizar(Reclamo reclamo){
        String sql = (
                "UPDATE reclamo "
        );
        String set="";
        if(reclamo.getObservaciones()!=null){
            set+= "SET observaciones = '"+reclamo.getObservaciones()+"', fecha_resp_operaciones = ' "+reclamo.getFechaRespOperaciones()+"'";
        }

        if(reclamo.getFechaRespSeguridad()!=null){
            set+= "SET fecha_resp_seguridad = '"+reclamo.getFechaRespSeguridad()+"' ";
        }
        String where = "where numero_volante='" + reclamo.getNumeroVolante()+"'";
        Query query = em.createNativeQuery(sql + set+ where);
        int filas = query.executeUpdate();
        em.close();
        return Collections.singletonList(filas);
    }
}
