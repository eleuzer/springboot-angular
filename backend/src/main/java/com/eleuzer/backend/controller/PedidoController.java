package com.eleuzer.backend.controller;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.eleuzer.backend.model.ItemPedido;
import com.eleuzer.backend.model.Pedido;
import com.eleuzer.backend.repository.PedidoRepository;

@RestController
public class PedidoController {

	@Autowired
	private PedidoRepository pedidoRepository;

	@GetMapping("/pedidos")
	public List<Pedido> getAllpedidos() {
		return pedidoRepository.findAll();
	}

	@PostMapping("/pedido")
	public Pedido insertpedido(@Valid @RequestBody Pedido pedido) {
		pedido.setValorTotal(0.0);
		Optional.ofNullable(pedido.getItemPedidos()).ifPresent(itemPedidos -> {
			itemPedidos.stream().forEach(itemPedido -> {
				itemPedido.setPedido(pedido);
				double valorTotal = pedido.getValorTotal();				
				pedido.setValorTotal(valorTotal + (itemPedido.getProduto().getPreco() * itemPedido.getQuantidade()));
			});
		});
		
		pedido.setData(new Date());
		pedidoRepository.save(pedido);
		return null;
	}

	@PutMapping("/pedido/{pedidoId}")
	public Pedido updatepedido(@PathVariable Long pedidoId, @Valid @RequestBody Pedido pedidoRequest) {
		return pedidoRepository.findById(pedidoId).map(pedido -> {
			pedido.setData(pedidoRequest.getData());
			pedido.setValorTotal(pedidoRequest.getValorTotal());
			pedido.setPessoa(pedidoRequest.getPessoa());
			pedido.setItemPedidos(pedidoRequest.getItemPedidos());

			return pedidoRepository.save(pedido);
		}).orElseThrow(() -> new RuntimeException("pedido not found with id " + pedidoId));
	}

	@DeleteMapping("/pedido/{pedidoId}")
	public ResponseEntity<?> deletepedido(@PathVariable Long pedidoId) {
		return pedidoRepository.findById(pedidoId).map(pedido -> {
			pedidoRepository.delete(pedido);
			return ResponseEntity.ok().build();
		}).orElseThrow(() -> new RuntimeException("pedido not found with id " + pedidoId));
	}

	@GetMapping("/pedido/{pedidoId}")
	public ResponseEntity<Pedido> findpedido(@PathVariable Long pedidoId) {
		return pedidoRepository.findById(pedidoId).map(pedido -> ResponseEntity.ok().body(pedido))
				.orElse(ResponseEntity.notFound().build());
	}

}