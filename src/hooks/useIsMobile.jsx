import { useEffect, useState } from "react";

export function useIsMobile(breakpoint = 900) {
	// 1. Estado inicial para determinar se a largura da janela é menor que o breakpoint
	const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

	// 2. useEffect para adicionar e remover o evento de redimensionamento da janela
	useEffect(() => {
		// Função para atualizar o estado isMobile com base na largura da janela
		const handleResize = () => {
			setIsMobile(window.innerWidth < breakpoint); // Atualiza o estado se a largura da janela for menor que o breakpoint
		};

		// Adiciona o listener para o evento de redimensionamento da janela
		window.addEventListener("resize", handleResize);

		// Cleanup: Remove o listener para evitar vazamentos de memória
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [breakpoint]); // Dependência: Reexecuta o efeito se o breakpoint mudar

	// 3. Retorna o estado isMobile
	return isMobile;
}
