// 1. Bibliotecas externas
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";

import { Button } from "../../components/Button";
import { FileInput } from "../../components/FileInput";
import { Input } from "../../components/Input";
import { Tags } from "../../components/Tags";
import { ValidationErrorToast } from "../../components/ValidationErrorToast";
// 2. Componentes internos
import { Container } from "./styles";

// 3. Utilitários e Helpers
import { api } from "../../services/api";

// 4. Assets
import arrowBack from "../../assets/icons/CaretLeft.svg";
import { GetBack } from "../../components/GetBack";

export function NewDish() {
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

	// Função para limpar o formulário
	function clearForm() {
		setImage(null);
		setImageName("");
		setName("");
		setCategory("Refeições");
		setTags([]);
		setPrice("");
		setDescription("");
	}

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

	// Função para cadastrar um novo prato
	async function handleNewDish() {
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
		formData.append("image", image); // Adiciona a imagem se existir
		const tagsJSON = JSON.stringify(tags); // Converte as tags em JSON
		formData.append("tags", tagsJSON);

		try {
			await api.post("/dishes/newdish", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("Prato cadastrado com sucesso"); // Mostra uma mensagem de sucesso
			clearForm(); // Limpa o formulário após o sucesso
		} catch (error) {
			if (error.response) {
				toast.error(error.response.data.message); // Mostra a mensagem de erro recebida da API
			} else {
				toast.error("Não foi possível cadastrar"); // Mensagem de erro genérica
			}
			clearForm(); // Limpa o formulário em caso de erro
		}
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
					priceRef.currewnt.focus(); // Foca no próximo input (preço)
					break;
				case "price":
					descriptionRef.current.focus(); // Foca no próximo input (descrição)
					break;
				case "description":
					handleNewDish(); // Chama a função para cadastrar o prato ao pressionar Enter na descrição
					break;
				default:
					break;
			}
		}
	};

	return (
		<Container > 
			{/* Botão para voltar à página anterior */}
			<GetBack/>

			<h1>Novo prato</h1>

			<form onSubmit={(e) => e.preventDefault()}>
				{/* Componente para seleção de imagem */}
				<FileInput
					name={imageName ? imageName : "Selecione uma imagem"}
					onChange={handleChangeImage}
				/>

				{/* Input para nome do prato */}
				<Input
					type="text"
					name="Nome"
					placeholder="Ex: Salada Caesar"
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
							<Tags
								key={`${tag.id}+${index}`}
								tag={tag}
								onRemoveTag={handleRemoveTag}
							/>
						))}

						<Tags isnew="true" onAddTag={handleAddTag} ref={tagsRef} />
					</section>
				</label>

				{/* Input para preço do prato */}
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
						placeholder="Fale brevemente sobre o prato, seus ingredientes e composição"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						onKeyDown={handleKeyDown}
						ref={descriptionRef}
					/>
				</label>

				{/* Botão para salvar alterações */}
				<Button
					type="submit"
					name="salvar alteracoes"
					onClick={handleNewDish}
				/>
			</form>
		</Container>
	);
}
