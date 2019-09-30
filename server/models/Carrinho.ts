import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Carrinho {

  @Field({ nullable: true })
  codigo: string;

  @Field({ nullable: true })
  codigoCarrinho: string;

  @Field({ nullable: true })
  valorTotal: number;

  @Field({ nullable: true })
  valorFrete: number;

  @Field({ nullable: true })
  valorMercadoria: number;

  @Field({ nullable: true })
  valorServico: number;

  @Field({ nullable: true })
  nomeProdutoMaisCaro: string;

  // @Field(() => [Item], { nullable: true })
  // itens: [Item];

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  codigoFilial: number;

  @Field({ nullable: true })
  codigoEmpresa: number;

  @Field({ nullable: true })
  codigoBandeira: number;

  @Field({ nullable: true })
  codigoVendedor: number;

  @Field({ nullable: true })
  nomeCupomDesconto: string;

  // @Field(() => [Regra], { nullable: true })
  // regras: [Regra];

  @Field({ nullable: true })
  cupomAplicado: boolean;

  // @Field(() => [Atendimento], { nullable: true })
  // atendimentos: [Atendimento];

  @Field({ nullable: true })
  dataHora: string;

  // @Field(() => [RequisitoCrediario], { nullable: true })
  // requisitoCrediario: [RequisitoCrediario];

  @Field({ nullable: true })
  descontoNaoRecomendado: boolean;
}