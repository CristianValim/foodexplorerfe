import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ValidationErrorToast = ({
	name,
	category,
	price,
	description,
	image,
	tags,
}) => {
	let errorFound = false;

	if (!name) {
		toast.warn("Por favor, insira o nome do prato.");
		errorFound = true;
		return;
	}

	if (!category) {
		toast.warn("Por favor, selecione uma categoria.");
		errorFound = true;
		return;
	}

	if (!price) {
		toast.warn("Por favor, insira o preço do prato.");
		errorFound = true;
		return;
	}

	if (!description) {
		toast.warn("Por favor, insira a descrição do prato.");
		errorFound = true;
		return;
	}

	if (!image) {
		toast.warn("Por favor, selecione uma imagem do prato.");
		errorFound = true;
		return;
	}

	if (!tags.length) {
		toast.warn("Por favor, adicione pelo menos um ingrediente.");
		errorFound = true;
		return;
	}

	return errorFound;
};
