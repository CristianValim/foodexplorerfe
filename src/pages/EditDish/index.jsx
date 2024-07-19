// 1. Bibliotecas externas
import { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// 2. Componentes internos
import { Container } from "./styles";
import { CustomConfirmAlert } from "./styles";
import { ValidationErrorToast } from "../../components/ValidationErrorToast";
import { Input } from "../../components/Input";
import { FileInput } from "../../components/FileInput";
import { Button } from "../../components/Button";
import { Tags } from "../../components/Tags";

// 3. Utilitários e Helpers
import { api } from "../../services/api";

// 4. Assets
import arrowBack from "../../assets/icons/CaretLeft.svg";


export function EditDish() {
  const { id } = useParams(); // Obtém o ID do prato da URL
  const navigate = useNavigate(); // Hook para navegação entre rotas

  // Estado para armazenar informações do prato
  const [image, setImage] = useState(null); // Imagem do prato
  const [imageName, setImageName] = useState(""); // Nome do arquivo da imagem
  const [name, setName] = useState(""); // Nome do prato
  const [category, setCategory] = useState("Refeições"); // Categoria do prato
  const [tags, setTags] = useState([]); // Tags associadas ao prato
  const [price, setPrice] = useState(""); // Preço do prato
  const [description, setDescription] = useState(""); // Descrição do prato

  // Referências para os inputs para focar neles
  const nameRef = useRef(null);
  const categoryRef = useRef(null);
  const tagsRef = useRef(null);
  const priceRef = useRef(null);
  const descriptionRef = useRef(null);

  // useEffect para carregar as informações do prato ao montar o componente
  useEffect(() => {
    async function getDish() {
      try {
        const response = await api.get(`/dishes/${id}`); // Requisição para obter os dados do prato
        const dish = response.data; // Dados do prato recebidos

        // Atualiza o estado com os dados do prato
        setName(dish.name);
        setImageName(dish.imageName);
        setImage(dish.image);
        setDescription(dish.description);
        setPrice(dish.price);
        setCategory(dish.category);
        setTags(dish.tags);
      } catch (error) {
        // Mostra um erro se a requisição falhar
        toast.error("Erro ao carregar o prato");
      }
    }

    getDish(); // Chama a função para obter os dados do prato
  }, [id]); // Dependência: Reexecuta o efeito se o ID mudar

  // Função para lidar com a mudança da imagem
  function handleChangeImage(event) {
    const file = event.target.files[0]; // Obtém o arquivo da imagem selecionado
    setImage(file); // Atualiza o estado com o arquivo da imagem
    setImageName(file.name); // Atualiza o nome do arquivo da imagem
  }

  // Função para adicionar uma nova tag
  function handleAddTag(newTag) {
    setTags((prevTags) => [...prevTags, newTag]); // Adiciona a nova tag ao estado
  }

  // Função para remover uma tag existente
  function handleRemoveTag(tagToRemove) {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove)); // Remove a tag do estado
  }

  // Função para editar o prato
  async function handleEditDish() {
    // Valida os dados e mostra um erro se houver alguma inconsistência
    const isError = ValidationErrorToast({
      name,
      category,
      price,
      description,
      image,
      tags,
    });

    if (isError) return; // Se houver um erro, não prossegue

    // Cria um objeto FormData para enviar os dados com a imagem
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    if (image) {
      formData.append("image", image); // Adiciona a imagem se existir
    }

    const tagsJSON = JSON.stringify(tags); // Converte as tags em JSON
    formData.append("tags", tagsJSON);

    try {
      // Envia a requisição para atualizar o prato
      await api.put(`/dishes/editdish/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Prato atualizado com sucesso"); // Mostra uma mensagem de sucesso
      navigate("/"); // Redireciona para a página inicial
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message); // Mostra a mensagem de erro recebida da API
      } else {
        toast.error("Não foi possível atualizar o prato"); // Mensagem de erro genérica
      }
    }
  }

  // Função para confirmar a exclusão do prato
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
                    await api.delete(`/dishes/${id}`); // Envia a requisição para excluir o prato
                    toast.success("Prato deletado com sucesso"); // Mostra uma mensagem de sucesso
                    navigate("/"); // Redireciona para a página inicial
                    onClose(); // Fecha o alerta de confirmação
                  } catch (error) {
                    toast.error("Erro ao deletar o prato"); // Mostra uma mensagem de erro
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

  // Função para lidar com o pressionamento da tecla Enter para navegação entre os inputs
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Previne o comportamento padrão do Enter
      switch (event.target.name) {
        case "name":
          categoryRef.current.focus(); // Foca no próximo input (categoria)
          break;
        case "category":
          tagsRef.current.focus(); // Foca no próximo input (tags)
          break;
        case "tags":
          priceRef.current.focus(); // Foca no próximo input (preço)
          break;
        case "price":
          descriptionRef.current.focus(); // Foca no próximo input (descrição)
          break;
        case "description":
          handleEditDish(); // Chama a função para editar o prato ao pressionar Enter na descrição
          break;
        default:
          break;
      }
    }
  };

  return (
    <Container>
      {/* Botão para voltar à página anterior */}
      <button onClick={window.history.back()} className="getBack">
        <img src={arrowBack} alt="Voltar" /> voltar
      </button>

      <h1>Editar prato</h1>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Componente para seleção de imagem */}
        <FileInput
          name={imageName ? imageName : "Selecione uma imagem para alterá-la"}
          onChange={handleChangeImage}
        />

        {/* Input para nome do prato */}
        <Input
          type="text"
          name="Nome"
          placeholder={name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={nameRef}
        />

        {/* Seletor para categoria do prato */}
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
            <option value="Refeições">Refeições</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Sobremesa">Sobremesa</option>
          </select>
        </label>

        {/* Seção para tags/ingredientes do prato */}
        <label className="tagsLabel" htmlFor="tags">
          Ingredientes
          <section className="tagsSection">
            {tags.map((tag, index) => (
              <Tags key={index} tag={tag} onRemoveTag={handleRemoveTag} />
            ))}
            <Tags isNew onAddTag={handleAddTag} ref={tagsRef} />
          </section>
        </label>

        {/* Input para preço do prato */}
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

        {/* Textarea para descrição do prato */}
        <label className="description" htmlFor="description">
          Descrição
          <textarea
            id="description"
            name="description"
            rows="7"
            cols="50"
            placeholder={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={descriptionRef}
          ></textarea>
        </label>

        {/* Botões para excluir e salvar alterações */}
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
