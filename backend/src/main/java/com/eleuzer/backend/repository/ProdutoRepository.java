package com.eleuzer.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eleuzer.backend.model.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {
}