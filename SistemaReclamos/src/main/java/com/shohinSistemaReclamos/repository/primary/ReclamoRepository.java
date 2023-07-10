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
                        "awb,hawb,estado,fecha_vuelo,importador,agente_aduana,agente_carga,motivo_reclamo,asistio,almacen,tipo_carga,bulto_mal_estado,bulto_recibido,numero_vuelo," +
                        "tipo_ingreso) " +
                        "VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
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
                .setParameter(19,false)
                .setParameter(20,reclamo.getAlmacen())
                .setParameter(21,reclamo.getTipoCarga())
                .setParameter(22,reclamo.getBultoMalEstado())
                .setParameter(23,reclamo.getBultoRecibido())
                .setParameter(24,reclamo.getNumeroVuelo())
                .setParameter(25,reclamo.getTipoIngreso())
                .executeUpdate();
        em.close();
        return Collections.singletonList(1);

    }

    public List<?> listar(){
        String sql = (
                "select id, codigo, fecha_envio, fecha_recepcion, fecha_resp_seguridad, fecha_resp_operaciones, observaciones, estado,numero_volante,fecha_resp_legal,fecha_cierre," +
                        "fecha_recepcion_cliente,cliente,asistio,fecha_cita_cliente1,fecha_cita_cliente2,awb,hawb,almacen,motivo_reclamo,bulto_mal_estado,tipo_carga,bulto_recibido, " +
                        "numero_vuelo,tipo_ingreso,fecha_vuelo,procede from reclamo "
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
                        (Long) t[0], (String) t[1], (Date) t[2], (Date) t[3], (Date) t[4], (Date) t[5], (String) t[6], (Character) t[7],(String) t[8],(Date) t[9],(Date) t[10],
                        (Date) t[11],(String) t[12],(Boolean) t[13],(Date) t[14],(Date) t[15],(String) t[16],(String)t[17],(String)t[18],(String) t[19],(Integer)t[20],(String)t[21],
                        (Integer) t[22],(String) t[23],(Character) t[24],(Date) t[25],(String) t[26]
                ))
                .collect(Collectors.toList());
    }

    public List<?> actualizar(Reclamo reclamo){
        String sql = (
                "UPDATE reclamo "
        );
        String set="";
        if(reclamo.getObservaciones()!=null){
            set+= "SET observaciones = '"+reclamo.getObservaciones()+"', fecha_resp_operaciones = ' "+reclamo.getFechaRespOperaciones()+"', cliente = ' "
            +reclamo.getCliente()+"', fecha_cita_cliente1 = '" + reclamo.getFechaCitaCliente1() + "', asistio = 'false'" ;
        }

        if(reclamo.getFechaRespSeguridad()!=null){
            set+= "SET fecha_resp_seguridad = '"+reclamo.getFechaRespSeguridad()+"' ";
        }

        if(reclamo.getFechaEnvio() !=null){
            set+= "SET fecha_envio = '" + reclamo.getFechaEnvio()+"' ";
        }

        if(reclamo.getFechaCierre()!=null){
            set+= "SET fecha_cierre = '" + reclamo.getFechaCierre()+"', estado = 'C' , procede='"+reclamo.getProcede()+"' ";
        }
        if(reclamo.getFechaRespLegal()!=null){
            set+= "SET fecha_resp_legal = '" + reclamo.getFechaRespLegal()+"' , estado = 'A' ";
        }
        if(reclamo.getFechaRecepcionCliente()!=null){
            set+= "SET fecha_recepcion_cliente = '" + reclamo.getFechaRecepcionCliente()+"'";
        }

        if(reclamo.isAsistio() && reclamo.getFechaCitaCliente2() ==null){
            set+= "SET asistio = true ";
        }

        if(reclamo.getFechaCitaCliente2()!=null){
            set+="SET fecha_cita_cliente2='"+reclamo.getFechaCitaCliente2()+"' ";
        }

        String where = "where numero_volante='" + reclamo.getNumeroVolante()+"'";
        Query query = em.createNativeQuery(sql + set+ where);
        int filas = query.executeUpdate();
        em.close();
        return Collections.singletonList(filas);
    }

    public List<?> filtarPorFecha(Reclamo reclamo){
        String sql = (
                "select id, codigo, fecha_envio, fecha_recepcion, fecha_resp_seguridad, fecha_resp_operaciones, observaciones, estado,numero_volante,fecha_resp_legal," +
                        "fecha_cierre,fecha_recepcion_cliente,cliente,asistio,fecha_cita_cliente1,fecha_cita_cliente2,awb,hawb,almacen,motivo_reclamo,bulto_mal_estado," +
                        "tipo_carga,bulto_recibido,numero_vuelo,tipo_ingreso,fecha_vuelo,procede from reclamo  "
        );
        String where ="";
        where="where fecha_recepcion BETWEEN '" + reclamo.getFechaInicio()+"' and '" + reclamo.getFechaFin()+"'";
        String orderBy = "";
        orderBy += " order by id";
        Query query = em.createNativeQuery(sql +where+ orderBy);
        List<Object[]> lista = query.getResultList();
        System.out.println("cual es el sql " + sql +where  +orderBy);
        em.close();
        return lista.stream()
                .map(t -> new Reclamo(
                        //(Long) t[0], (String) t[1], (String) t[2], (String) t[3], (Date) t[4], (Date) t[5], (Date) t[6], (Date) t[7], (String) t[8], (String) t[9], (String) t[10], (String) t[11], (String) t[12],
                        //(String) t[13], (String) t[14], (String) t[15], (String) t[16],(Character) t[17]
                        //(Long) t[0],(String) t[1]
                        (Long) t[0], (String) t[1], (Date) t[2], (Date) t[3], (Date) t[4], (Date) t[5], (String) t[6], (Character) t[7],(String) t[8],(Date) t[9],(Date) t[10],
                        (Date) t[11],(String) t[12],(Boolean) t[13],(Date) t[14],(Date) t[15],(String) t[16],(String)t[17],(String) t[18],(String) t[19],(Integer)t[20],
                        (String)t[21],(Integer) t[22],(String) t[23],(Character) t[24],(Date) t[25],(String) t[26]
                ))
                .collect(Collectors.toList());
    }
    public List<?> filtrarPorEstado(Reclamo reclamo){
        String sql = (
                "select id, codigo, fecha_envio, fecha_recepcion, fecha_resp_seguridad, fecha_resp_operaciones, observaciones, estado,numero_volante,fecha_resp_legal," +
                        "fecha_cierre,fecha_recepcion_cliente,cliente,asistio,fecha_cita_cliente1,fecha_cita_cliente2,awb,hawb,almacen,motivo_reclamo," +
                        "bulto_mal_estado,tipo_carga,bulto_recibido,numero_vuelo,tipo_ingreso,fecha_vuelo,procede from reclamo "
        );
        String where ="";
        where="where estado = '" + reclamo.getEstado()+"'";
        String orderBy = "";
        orderBy += " order by id";
        Query query = em.createNativeQuery(sql +where+ orderBy);
        List<Object[]> lista = query.getResultList();
        System.out.println("cual es el sql " + sql +where  +orderBy);
        em.close();
        return lista.stream()
                .map(t -> new Reclamo(
                        //(Long) t[0], (String) t[1], (String) t[2], (String) t[3], (Date) t[4], (Date) t[5], (Date) t[6], (Date) t[7], (String) t[8], (String) t[9], (String) t[10], (String) t[11], (String) t[12],
                        //(String) t[13], (String) t[14], (String) t[15], (String) t[16],(Character) t[17]
                        //(Long) t[0],(String) t[1]
                        (Long) t[0], (String) t[1], (Date) t[2], (Date) t[3], (Date) t[4], (Date) t[5], (String) t[6], (Character) t[7],(String) t[8],(Date) t[9],(Date) t[10],
                        (Date) t[11],(String) t[12],(Boolean) t[13],(Date) t[14],(Date) t[15],(String) t[16],(String)t[17],(String) t[18],(String) t[19],(Integer)t[20],(String) t[21],
                        (Integer) t[22],(String) t[23],(Character) t[24],(Date) t[25],(String) t[26]
                ))
                .collect(Collectors.toList());
    }

    public List<?> detalleReclamo(Reclamo reclamo){
        String sql = (
                "select id, codigo, fecha_envio, fecha_recepcion, fecha_resp_seguridad, fecha_resp_operaciones, observaciones, estado,numero_volante,fecha_resp_legal," +
                        "fecha_cierre,fecha_recepcion_cliente from reclamo "
        );
        String where ="";
        where="where estado = '" + reclamo.getEstado()+"'";
        String orderBy = "";
        Query query = em.createNativeQuery(sql +where);
        List<Object[]> lista = query.getResultList();
        System.out.println("cual es el sql " + sql +where  +orderBy);
        em.close();
        return lista.stream()
                .map(t -> new Reclamo(
                        //(Long) t[0], (String) t[1], (String) t[2], (String) t[3], (Date) t[4], (Date) t[5], (Date) t[6], (Date) t[7], (String) t[8], (String) t[9], (String) t[10], (String) t[11], (String) t[12],
                        //(String) t[13], (String) t[14], (String) t[15], (String) t[16],(Character) t[17]
                        //(Long) t[0],(String) t[1]
                        (Long) t[0], (String) t[1], (Date) t[2], (Date) t[3], (Date) t[4], (Date) t[5], (String) t[6], (Character) t[7],(String) t[8],(Date) t[9],(Date) t[10],
                        (Date) t[11],(String) t[12],(Boolean) t[13],(Date) t[14],(Date) t[15],(String) t[16],(String)t[17],(String) t[18],(String)t[19],(Integer) t[20],(String) t[21],
                        (Integer) t[22],(String) t[23],(Character) t[24],(Date) t[25],(String) t[26]
                ))
                .collect(Collectors.toList());
    }

}
