import { useDispatch, useSelector } from "react-redux";
import Header from "../../Components/Header";
import styles from "./Anuncie.module.scss";
import Button from "../../Components/Button";
import { useForm } from "react-hook-form";
import { cadastarItem } from "../../store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "../../Components/Input";

export default function Anuncie() {
  const dispatch = useDispatch();

  const { nomeCategoria = "" } = useParams();
  const categorias = useSelector((state) =>
    state.categorias.map(({ nome, id }) => ({ nome, id }))
  );

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      categoria: nomeCategoria,
    },
  });

  const { errors } = formState;

  function cadastrar(data) {
    dispatch(cadastarItem(data));
  }

  return (
    <div className={styles.container}>
      <Header
        titulo="Anuncie aqui"
        descricao="faça seu anuncio no melhor site"
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("titulo", { required: true })}
          placeholder="nome do produto"
        />
        <Input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("descricao", { required: "campo obrigatorio" })}
          placeholder="Descricao do produto"
        />
        <Input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("foto", { required: true })}
          placeholder="url da imagem"
        />
        <select
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("categoria", { required: true })}
          disabled={nomeCategoria}
        >
          <option value="" disabled>
            Selecione categoria
          </option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>

        <Input
          className={errors.nome ? styles["input-erro"] : ""}
          {...register("preco", { required: true, valueAsNumber: true })}
          type="number"
          placeholder="Preco"
        />
        <Button type={"submit"}>Cadastrar produto</Button>
      </form>
    </div>
  );
}
