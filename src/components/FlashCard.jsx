export default function FlashCard({
  id,
  title = 'Título do card',
  description = 'Descrição do card, que pode ser bem longa e ocupar várias linhas.',
  showFlashCardTitle = true,
  onToggleFlashCard = null,
}) {
  const handleCardClick = () => {
    if (onToggleFlashCard) {
      onToggleFlashCard(id);
    }
  };

  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';

  return (
    <div
      className={`border shadow-lg p-2 m-2 w-80 h-48 cursor-pointer
                  flex flex-row items-center justify-center 
                  font-semibold ${fontSizeClassName}`}
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  );
}
