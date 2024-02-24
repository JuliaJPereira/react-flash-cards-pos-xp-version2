import TextInput from './TextInput';

export default function FlashCardForm({ createMode = true }) {
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return (
    <form className={`${backgroundClassName} p-4`}>
      <h2 className="text-center font-semibold">Manutenção de Flash Cards</h2>
      <TextInput labelDescription="Título:" />
    </form>
  );
}
