import { useState } from 'react';
import TextArea from './TextArea';
import TextInput from './TextInput';

export default function FlashCardForm({ createMode = true }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleTitleChange(newTitle) {
    setTitle(newTitle);
  }

  function handleDescriptionChange(newDescription) {
    setDescription(newDescription);
  }

  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return (
    <form className={`${backgroundClassName} p-4`}>
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
    </form>
  );
}
