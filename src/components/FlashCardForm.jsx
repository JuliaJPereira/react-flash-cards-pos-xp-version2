export default function FlashCardForm({ createMode = true }) {
  const backgroundClassName = createMode ? 'bg-green-100' : 'bg-yellow-100';
  return <div className={backgroundClassName}>FlashCardForm</div>;
}
