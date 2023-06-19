package com.shohinSistemaReclamos.repository;

import com.shohinSistemaReclamos.entity.Volante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface VolanteRepository extends JpaRepository<Volante, Long> {
    @Query(value = "SELECT * FROM volantes WHERE numero_volante = :numeroVolante", nativeQuery = true)
    Volante findByNumeroVolante(@Param("numeroVolante") String numeroVolante);

}