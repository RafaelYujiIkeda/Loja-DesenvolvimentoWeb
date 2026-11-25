export interface Pedido {
  codigoPedido?: number;
  clienteCodigo?: number;
  clienteNome?: string;
  itensJson?: string;
  status?: string;
  dataPedido?: string;
  valorTotal?: number;
}
