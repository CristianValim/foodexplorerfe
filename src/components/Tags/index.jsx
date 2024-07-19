// 1. Bibliotecas externas
import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

// 2. Componentes internos
import { Container } from "./styles";

// Componente Tags
export function Tags({ isNew, onAddTag, onRemoveTag, tag }) {
  const [newTag, setNewTag] = useState("");

  // Função para adicionar uma nova tag
  function handleAddTag() {
    if (newTag.trim() === "") return;

    onAddTag(newTag);
    setNewTag("");
  }

  return (
    <Container isNew={isNew}>
      {/* Campo de input para adicionar ou exibir uma tag */}
      <input
        type="text"
        value={isNew ? newTag : tag}
        readOnly={!isNew}
        placeholder="Adicionar"
        onChange={(e) => setNewTag(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
          }
        }}
      />
      
      {/* Botão para adicionar ou remover uma tag */}
      <button
        type="button"
        onClick={() => {
          if (isNew) {
            handleAddTag();
          } else {
            onRemoveTag(tag);
          }
        }}
      >
        {isNew ? <FiPlus size={15} /> : <FiX size={15} />}
      </button>
    </Container>
  );
}
