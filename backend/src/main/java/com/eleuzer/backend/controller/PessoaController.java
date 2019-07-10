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

import com.eleuzer.backend.model.Pessoa;
import com.eleuzer.backend.repository.PessoaRepository;

@RestController
public class PessoaController {

	@Autowired
	private PessoaRepository pessoaRepository;

	@GetMapping("/pessoas")
	public List<Pessoa> getAll() {
		return pessoaRepository.findAll();
	}

	@GetMapping("/pessoas/pagination")
	public Page<Pessoa> getAllLazy(Pageable pageable) {
		return pessoaRepository.findAll(pageable);
	}

	@PostMapping("/pessoa")
	public Pessoa insertPessoa(@Valid @RequestBody Pessoa pessoa) {
		return pessoaRepository.save(pessoa);
	}

	@PutMapping("/pessoa/{pessoaId}")
	public Pessoa updatePessoa(@PathVariable Long pessoaId, @Valid @RequestBody Pessoa pessoaRequest) {
		return pessoaRepository.findById(pessoaId).map(pessoa -> {
			pessoa.setRazaoSocial(pessoaRequest.getRazaoSocial());
			pessoa.setEmail(pessoaRequest.getEmail());
			return pessoaRepository.save(pessoa);
		}).orElseThrow(() -> new RuntimeException("Pessoa not found with id " + pessoaId));
	}

	@DeleteMapping("/pessoa/{pessoaId}")
	public ResponseEntity<?> deletePessoa(@PathVariable Long pessoaId) {
		return pessoaRepository.findById(pessoaId).map(Pessoa -> {
			pessoaRepository.delete(Pessoa);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new RuntimeException("Pessoa not found with id " + pessoaId));
	}

	@GetMapping("/pessoa/{pessoaId}")
	public ResponseEntity<Pessoa> findPessoa(@PathVariable Long pessoaId) {
		return pessoaRepository.findById(pessoaId).map(pessoa -> ResponseEntity.ok().body(pessoa))
				.orElse(ResponseEntity.notFound().build());
	}

}