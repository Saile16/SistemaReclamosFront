package com.shohinSistemaReclamos.repository;

import com.shohinSistemaReclamos.entity.Reclamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReclamoRepository extends JpaRepository<Reclamo,Long> {

    Optional<Reclamo> findByNumeroVolante(String numeroVolante);
}
