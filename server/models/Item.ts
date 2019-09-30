import { Field, ObjectType } from 'type-graphql';
import Garantia from './Garantia';
import Produto from './Produto';

@ObjectType()
export default class Item {

  @Field()
  codigo: string;

  @Field()
  sku: number;

  @Field()
  conjuntoPrincipal: boolean;

  @Field()
  tipoProduto: string;

  @Field()
  tipoEstoque: string

  @Field()
  quantidade: number;

  @Field()
  valorTotal: number;

  @Field()
  produto: Produto;

  @Field(() => [Garantia], { nullable: true })
  garantias: [Garantia];

  @Field()
  valorTotalServicos: number;

  // @Field(() => Object, { nullable: true })
  // itensConjunto: [Object]

  // @Field(() => Object, { nullable: true })
  // entrega: Object;

  // @Field(() => Object, { nullable: true })
  // fiqueSeguro: [Object];

  @Field()
  tipoEntrega: string;

  // @Field(() => Object, { nullable: true })
  // montagens: [Object];

  // @Field(() => Object, { nullable: true })
  // servicosTecnicos: [Object];

  // @Field(() => Object, { nullable: true })
  // combos: [Object];

  // @Field(() => Object, { nullable: true })
  // campanhas: [Object];

  @Field()
  valorUnitario: number;

  @Field()
  valorDesconto: number;

  @Field()
  valorFrete: number;

  @Field()
  valorLiquido: number;

  @Field()
  valorTotalGarantias: number;

  @Field()
  valorTotalFiqueSeguro: number;

  @Field()
  valorTotalMontagem: number;

  @Field()
  valorTotalServicosTecnicos: number;

  @Field()
  valorTotalGarantiasConjunto: number;

  @Field()
  valorTotalServicoTecnicoConjunto: number;

  @Field()
  valorTotalCombos: number;

  @Field()
  valorTotalCampanhas: number;

  @Field()
  celular: string;

  @Field()
  isTelefoniaCelular: boolean;

  // @Field(() => Object, { nullable: true })
  // condicoesPagamento: [Object];

  @Field()
  multiassistencia: boolean;

  @Field()
  protecaoFinanceira: boolean;

  @Field()
  vidaProtegida: boolean;

  @Field()
  casaProtegida: boolean;

  @Field()
  disponibilidadeAlternativa: boolean;

  @Field()
  retiradaDeposito: boolean;

  @Field()
  seguro: boolean;

  @Field()
  tipoVenda: string;

  @Field()
  conjunto: boolean;
}
