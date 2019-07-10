package com.eleuzer.backend.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eleuzer.backend.model.Produto;
import com.eleuzer.backend.repository.ProdutoRepository;

@RestController
public class ProdutoController {

	@Autowired
	private ProdutoRepository produtoRepository;

	@GetMapping("/produtos")
	public List<Produto> getAllprodutos() {
		return produtoRepository.findAll();
	}

	@GetMapping("/produtos/pagination")
	public Page<Produto> getAllLazy(Pageable pageable) {
		return produtoRepository.findAll(pageable);
	}

	@PostMapping("/produto")
	public Produto insertproduto(@Valid @RequestBody Produto produto) {
		return produtoRepository.save(produto);
	}

	@PutMapping("/produto/{produtoId}")
	public Produto updateproduto(@PathVariable Long produtoId, @Valid @RequestBody Produto produtoRequest) {
		return produtoRepository.findById(produtoId).map(produto -> {
			produto.setDescricao(produtoRequest.getDescricao());
			produto.setPreco(produtoRequest.getPreco());
			return produtoRepository.save(produto);
		}).orElseThrow(() -> new RuntimeException("produto not found with id " + produtoId));
	}

	@DeleteMapping("/produto/{produtoId}")
	public ResponseEntity<?> deleteproduto(@PathVariable Long produtoId) {
		return produtoRepository.findById(produtoId).map(produto -> {
			produtoRepository.delete(produto);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new RuntimeException("produto not found with id " + produtoId));
	}

	@GetMapping("/produto/{produtoId}")
	public ResponseEntity<Produto> findproduto(@PathVariable Long produtoId) {
		return produtoRepository.findById(produtoId).map(produto -> ResponseEntity.ok().body(produto))
				.orElse(ResponseEntity.notFound().build());
	}

}