import { useNavigate } from "react-router-dom";

import { Container } from "./styles.js";

import { api } from "../../services/api";

import { useEffect, useState } from "react";
import { SlMagnifier } from "react-icons/sl";

export function InputSearch({ placeholder, setOpen }) {
	const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca
	const [searchResults, setSearchResults] = useState([]); // Estado para armazenar os resultados da busca
	const navigate = useNavigate(); // Hook para navegação programática

	useEffect(() => {
		if (searchTerm.length > 0) {
			handleSearch(); // Executa a busca quando o termo de busca muda
		} else {
			setSearchResults([]); // Limpa os resultados se o termo de busca for vazio
		}
	}, [searchTerm]);

	// Função para atualizar o estado com o valor do input
	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	// Função para realizar a busca na API
	const handleSearch = async () => {
		try {
			const response = await api.get(`/dishes/index?term=${searchTerm}`);
			if (response.status !== 200) {
				throw new Error("Erro ao buscar pratos.");
			}
			const data = response.data;
			setSearchResults(data); // Atualiza os resultados da busca com os dados da API
		} catch (error) {
			console.error("Erro ao buscar pratos:", error);
		}
	};

	// Função chamada ao pressionar Enter no input
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault(); // Previne o comportamento padrão do formulário
			if (searchResults.length > 0) {
				handleResultClick(searchResults[0].id); // Navega para o primeiro resultado
			} else {
				handleSearch(); // Realiza a busca se não houver resultados
			}
		}
	};

	// Função chamada ao clicar em um resultado da busca
	const handleResultClick = (id) => {
		navigate(`/dishes/${id}`);
		setOpen(false); // Fecha o componente de busca
		setSearchTerm(""); // Limpa o termo de busca
		setSearchResults([]); // Limpa os resultados da busca
	};

	return (
		<Container>
			<div className="input-wrapper">
				<SlMagnifier className="searchIcon" size="2.4rem" />
				<input
					type="search"
					placeholder={placeholder || "Busque por pratos ou ingredientes"}
					value={searchTerm}
					onChange={handleSearchChange}
					onKeyDown={handleKeyDown}
				/>
				{searchResults.length > 0 && (
					<ul className="search-results">
						{searchResults.map((dish, index) => (
							<li key={`${dish.id}+${index}`} onClick={() => handleResultClick(dish.id)} onKeyDown={() => handleResultClick(dish.id)} >
								<div>
									<span>{dish.name}</span>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</Container>
	);
}
