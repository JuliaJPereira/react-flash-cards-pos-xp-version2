export default function Button({
  children: description = 'Descrição do botão',
  onButtonClick = null,
}) {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };
  return (
    <button
      className="bg-gray-200 p-2 rounded-md m-2"
      onClick={handleButtonClick}
    >
      {description}
    </button>
  );
}
