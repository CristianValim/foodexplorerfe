import { useState } from "react";
import { Container } from "./styles";
import { FiPlus, FiX } from "react-icons/fi";

export function Tags({ isNew, onAddTag, onRemoveTag, tag }) {
  const [newTag, setNewTag] = useState("");

  function handleAddTag() {
    if (newTag.trim() === "") return;

    onAddTag(newTag);
    setNewTag("");
  }

  return (
    <Container isNew={isNew}>
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
