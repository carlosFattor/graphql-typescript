import axios from 'axios';
import { Arg, Query, Resolver } from "type-graphql";
import Carrinho from "../../../models/Carrinho";

// http://10.128.132.60:5555/vv-carrinho/carrinhos/5beb1b8197a1c0000127dfcc/sacolas/5d837488194cd90001de877d

@Resolver()
export default class ObterCarrinhoResolver {

  @Query(() => Carrinho)
  async obterCarrinho(
    @Arg('carrinho') carrinho: string,
    @Arg('sacola') sacola: string): Promise<Carrinho | null> {

    const config = {
      headers: {
        Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwZXJtaXNzb2VzIjpbeyJ0cmFuc2FjYW8iOiJTNkJMIiwiZGVzY3JpY2FvIjoiVmVuZGVkb3IifSx7InRyYW5zYWNhbyI6IlM2NDAiLCJkZXNjcmljYW8iOiJMb2dpbiJ9XSwiZmlsaWFsIjoxMDAwLCJ1c2VyX25hbWUiOiI2MDY0NzIiLCJjb2RpZ29GdW5jaW9uYXJpbyI6NjA2NDcyLCJpcCI6IjEwLjIwNy4xMzIuMjE5IiwidHJhbnNhY2FvTG9naW4iOiJTNjQwIiwicG9udG9zIjpbIlM2NTkiLCJTNjYwIiwiUzY2MiIsIlM2NjUiLCJTNjY2Il0sIm5vbWUiOiJNQVJJQSBGIFIgQVpFVkVETyIsImVtcHJlc2FGdW5jaW9uYXJpbyI6MjEsInVmRmlsaWFsIjoiU1AiLCJjbGllbnRfaWQiOiJjbGllbnRhcHAiLCJzY29wZSI6WyJ3ZWJjbGllbnQiXSwidGlwb0F0aXZpZGFkZSI6IkwiLCJpbmRpY2F0aXZvQ2FuYWxWZW5kYSI6IkxPSkFTX0ZJU0lDQVMiLCJleHAiOjk5OTk5OTk5OTksImVtcHJlc2FGaWxpYWwiOjIxLCJiYW5kZWlyYSI6MSwianRpIjoiOTg2YjhjYmYtODIyZC00ZGQyLWIwMzEtNjIxYjc4YTU2ZTQ3In0.9X0MRr70oARwuT7j4Ig69lDskO1Z9ePz6-rp97PDdJ4'
      }
    }

    try {
      const URI = `http://10.128.132.60:5555/vv-carrinho/carrinhos/${carrinho}/sacolas/${sacola}`;

      const response = await axios.get(URI, config);
      const data: Carrinho = response.data;
      return data;

    } catch (error) {
      console.log({ config, error });
      return null
    }

  }
}