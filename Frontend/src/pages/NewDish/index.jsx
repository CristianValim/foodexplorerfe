import { useRef, useState } from "react";
import { useGetBack } from "../../hooks/useGetBack";
import { Container } from "./styles";
import arrowBack from "../../assets/icons/CaretLeft.svg";

import { toast } from "react-toastify";
import { ValidationErrorToast } from "../../components/ValidationErrorToast";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Tags } from "../../components/Tags";
import CurrencyInput from "react-currency-input-field";

import { api } from "../../services/api";

export function NewDish() {
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

  function clearForm() {
    setImage(null);
    setImageName("");
    setName("");
    setCategory("Prato Principal");
    setTags([]);
    setPrice("");
    setDescription("");
  }

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

  async function handleNewDish() {
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
    formData.append("image", image);
    const tagsJSON = JSON.stringify(tags);
    formData.append("tags", tagsJSON);

    try {
      console.log("Enviando requisição para o backend...");
      await api.post("/dishes/newdish", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Prato cadastrado com sucesso");

      return clearForm();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return clearForm();
      } else {
        toast.error("Não foi possível cadastrar");
      }
    }
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
          handleNewDish();
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

      <h1>Novo prato</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        <Input
          type="file"
          name={imageName ? imageName : "Selecione uma imagem"}
          onChange={handleChangeImage}
        />

        <Input
          type="text"
          name="name"
          placeholder="Ex: Salada Caesar"
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
            placeholder="R$ 0,00"
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
            placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={descriptionRef}
          ></textarea>
        </label>

        <Button
          type="submit"
          name="salvar alteracoes"
          onClick={handleNewDish}
        />
      </form>
    </Container>
  );
}
