package com.shohinSistemaReclamos.repository;

import com.shohinSistemaReclamos.entity.Reclamo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ReclamoRepository extends JpaRepository<Reclamo,Integer> {
}
