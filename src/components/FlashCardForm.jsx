import { useState } from 'react';
import TextArea from './TextArea';
import TextInput from './TextInput';
import Button from './Button';

export default function FlashCardForm({ createMode = true, onPersist = null }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  function clearFields() {
    setTitle('');
    setDescription('');
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (onPersist) {
      onPersist({ createMode, title, setTitle });
      clearFields();
    }
  }

  function handleFormReset() {
    clearFields();
  }

  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return (
    <form
      className={`${backgroundClassName} p-4`}
      onSubmit={handleFormSubmit}
      onReset={handleFormReset}
    >
      <h2 className="text-center font-semibold">Manutenção de Flash Cards</h2>
      <TextInput
        labelDescription="Título:"
        inputValue={title}
        onInputChange={handleTitleChange}
      />
      <TextArea
        labelDescription="Descrição:"
        textAreaValue={description}
        onTextAreaChange={handleDescriptionChange}
      />
      <div className="flex items-center justify-end">
        <Button colorClass="bg-red-200" type="reset">
          Limpar
        </Button>
        <Button colorClass="bg-green-300" type="submit">
          Salvar
        </Button>
      </div>
    </form>
  );
}
