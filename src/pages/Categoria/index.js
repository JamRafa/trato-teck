import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./categoria.module.scss";
import Header from "../../Components/Header";
import Item from "../../Components/item";
import Button from "../../Components/Button";
import { useEffect } from "react";
import { carregarUmaCategoria } from "../../store/reducers/categorias";

export default function Categoria() {
  const dispatch = useDispatch()
  const { nomeCategoria } = useParams();
  const nav = useNavigate();
  const { categoria, itens } = useSelector((state) => {
    const regexp = new RegExp(state.busca, "i");

    return {
      categoria: state.categorias.find(
        (categoria) => categoria.id === nomeCategoria
      ) || {},
      itens: state.itens.filter(
        (item) => item.categoria === nomeCategoria && item.titulo.match(regexp)
      ),
    };
  });


  useEffect(()=> {
    dispatch(carregarUmaCategoria(nomeCategoria))
  }, [dispatch, nomeCategoria])


  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => nav(`/anuncie/${nomeCategoria}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
