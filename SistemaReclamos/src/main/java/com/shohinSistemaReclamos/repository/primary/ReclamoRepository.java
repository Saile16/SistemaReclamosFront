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
        System.out.println("trae las guias ? Hija : " + reclamo.getGuiaHija() +" Master : " +reclamo.getGuiaMaster());
        em.createNativeQuery("INSERT INTO reclamo (codigo,descripcion,estado_carga,fecha_recepcion,linea_aerea,medio,monto_reclamo,numero_volante,persona_reclamo,tipo_reclamo," +
                        "awb,hawb,estado,fecha_vuelo,importador,agente_aduana,agente_carga,motivo_reclamo) " +
                        "VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
                .setParameter(1,reclamo.getCodigo())
                .setParameter(2,reclamo.getDescripcion())
                .setParameter(3,reclamo.getEstadoCarga())
                .setParameter(4,reclamo.getFechaRecepcion())
                .setParameter(5,reclamo.getLineaAerea())
                .setParameter(6,reclamo.getMedio())
                .setParameter(7,reclamo.getMontoReclamo())
                .setParameter(8,reclamo.getNumeroVolante())
                .setParameter(9,reclamo.getPersonaReclamo())
                .setParameter(10,reclamo.getTipoReclamo())
                .setParameter(11,reclamo.getGuiaMaster())
                .setParameter(12,reclamo.getGuiaHija())
                .setParameter(13,reclamo.getEstado())
                .setParameter(14,reclamo.getFechaVuelo())
                .setParameter(15,reclamo.getNombreConsignatario())
                .setParameter(16,reclamo.getAgenteAduana())
                .setParameter(17,reclamo.getAgenteCarga())
                .setParameter(18,reclamo.getMotivoReclamo())
                .executeUpdate();
        em.close();
        return Collections.singletonList(1);

    }

    public List<?> listar(){
        String sql = (
                "select id, codigo, fecha_envio, fecha_recepcion, fecha_resp_seguridad, fecha_resp_operaciones, observaciones, estado,numero_volante,fecha_resp_legal," +
                        "fecha_cierre,fecha_recepcion_cliente from reclamo "
        );
        String orderBy = "";
        orderBy += " order by id";

        Query query = em.createNativeQuery(sql + orderBy);
        List<Object[]> lista = query.getResultList();
        System.out.println("cual es el sql " + sql + orderBy);
        em.close();
        return lista.stream()
                .map(t -> new Reclamo(
                        //(Long) t[0], (String) t[1], (String) t[2], (String) t[3], (Date) t[4], (Date) t[5], (Date) t[6], (Date) t[7], (String) t[8], (String) t[9], (String) t[10], (String) t[11], (String) t[12],
                        //(String) t[13], (String) t[14], (String) t[15], (String) t[16],(Character) t[17]
                        //(Long) t[0],(String) t[1]
                        (Long) t[0], (String) t[1], (Date) t[2], (Date) t[3], (Date) t[4], (Date) t[5], (String) t[6], (Character) t[7],(String) t[8],(Date) t[9],(Date) t[10],(Date) t[11]
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

        if(reclamo.getFechaEnvio() !=null){
            set+= "SET fecha_envio = '" + reclamo.getFechaEnvio()+"' ";
        }

        if(reclamo.getFechaCierre()!=null){
            set+= "SET fecha_cierre = '" + reclamo.getFechaCierre()+"', estado = 'C' ";
        }
        if(reclamo.getFechaRespLegal()!=null){
            set+= "SET fecha_resp_legal = '" + reclamo.getFechaRespLegal()+"' , estado = 'A' ";
        }
        if(reclamo.getFechaRecepcionCliente()!=null){
            set+= "SET fecha_recepcion_cliente = '" + reclamo.getFechaRecepcionCliente()+"'";
        }
        String where = "where numero_volante='" + reclamo.getNumeroVolante()+"'";
        Query query = em.createNativeQuery(sql + set+ where);
        int filas = query.executeUpdate();
        em.close();
        return Collections.singletonList(filas);
    }
}
