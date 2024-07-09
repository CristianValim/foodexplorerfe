import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBack } from "../../hooks/useGetBack";
import { Container } from "./styles";
import { CustomConfirmAlert } from "./styles";
import arrowBack from "../../assets/icons/CaretLeft.svg";

import { toast } from "react-toastify";
import { ValidationErrorToast } from "../../components/ValidationErrorToast";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Tags } from "../../components/Tags";
import CurrencyInput from "react-currency-input-field";

import { api } from "../../services/api";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export function EditDish() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Entradas");
  const [tags, setTags] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const tagsRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    async function getDish() {
      try {
        const response = await api.get(`/dishes/${id}`);
        const dish = response.data;
        setName(dish.name);
        setImageName(dish.imageName);
        setImage(dish.image);
        setDescription(dish.description);
        setPrice(dish.price);
        setCategory(dish.category);
        setTags(dish.tags);
      } catch (error) {
        toast.error("Erro ao carregar o prato");
      }
    }

    getDish();
  }, [id]);

  function handleChangeImage(event) {
    const file = event.target.files[0];
    setImage(file);
    setImageName(file.name);
  }

  function handleAddTag(newTag) {
    setTags((prevTags) => [...prevTags, newTag]);
  }

  function handleRemoveTag(tagToRemove) {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  }

  async function handleEditDish() {
    const isError = ValidationErrorToast({
      name,
      category,
      price,
      description,
      image,
      tags,
    });

    if (isError) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    const tagsJSON = JSON.stringify(tags);
    formData.append("tags", tagsJSON);

    try {
      await api.put(`/dishes/editdish/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Prato atualizado com sucesso");
      navigate("/");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Não foi possível cadastrar");
      }
    }
  }

  async function handleExcludeDish() {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomConfirmAlert>
            <h1>Tem certeza que deseja excluir o prato?</h1>
            <div className="buttons">
              <button
                onClick={async () => {
                  try {
                    await api.delete(`/dishes/${id}`);
                    toast.success("Prato deletado com sucesso");
                    navigate("/");
                    onClose();
                  } catch (error) {
                    toast.error("Erro ao deletar o prato");
                  }
                }}
              >
                Sim
              </button>
              <button onClick={onClose}>Não</button>
            </div>
          </CustomConfirmAlert>
        );
      },
    });
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      switch (event.target.name) {
        case "name":
          categoryRef.current.focus();
          break;
        case "category":
          tagsRef.current.focus();
          break;
        case "tags":
          priceRef.current.focus();
          break;
        case "price":
          descriptionRef.current.focus();
          break;
        case "description":
          handleEditDish();
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container>
      <button onClick={useGetBack} className="getBack">
        <img src={arrowBack} alt="Voltar" /> voltar
      </button>

      <h1>Editar prato</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="file"
          name={imageName ? imageName : "Selecione uma imagem para alterá-la"}
          onChange={handleChangeImage}
        />

        <Input
          type="text"
          name="Nome"
          placeholder={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={nameRef}
        />

        <label className="dishCategory" htmlFor="category">
          Categoria
          <select
            className="categoryOptions"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={categoryRef}
          >
            <option value="Entradas">Entradas</option>
            <option value="Prato principal">Prato principal</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>
        </label>

        <label className="tagsLabel" htmlFor="tags">
          Ingredientes
          <section className="tagsSection">
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} onRemoveTag={handleRemoveTag} />
            ))}
            <Tags isNew onAddTag={handleAddTag} ref={tagsRef} />
          </section>
        </label>

        <label className="inputPriceLabel" htmlFor="inputPrice">
          Preço
          <CurrencyInput
            className="inputPrice"
            id="inputPrice"
            name="price"
            placeholder={price}
            value={price}
            decimalsLimit={2}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            onValueChange={(value) => setPrice(value)}
            onKeyDown={handleKeyDown}
            ref={priceRef}
          />
        </label>

        <label className="description" htmlFor="description">
          Descrição
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            placeholder={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={descriptionRef}
          ></textarea>
        </label>

        <div className="buttons">
          <Button toDelete name="Excluir prato" onClick={handleExcludeDish} />
          <Button
            type="submit"
            name="Salvar alterações"
            onClick={handleEditDish}
          />
        </div>
      </form>
    </Container>
  );
}
