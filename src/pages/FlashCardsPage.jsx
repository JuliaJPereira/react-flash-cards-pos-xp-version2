import FlashCard from '../components/FlashCard';
import Header from './../components/Header';
import Main from './../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import RadioButton from '../components/RadioButton';
import { apiGetAllFlashCards } from '../services/apiService';

export default function FlashCardsPage() {
  const [allCards, setAllCards] = useState([]);
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    apiGetAllFlashCards().then(allFlashCards => {
      setAllCards(allFlashCards);
    });
  }, []);

  function handleButtonClick() {
    const shuffledCards = helperShuffleArray(allCards);
    setAllCards(shuffledCards);
  }

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...allCards].map(card => ({ ...card, showTitle: true, }));

    setAllCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...allCards].map(card => ({ ...card, showTitle: false, }));

    setAllCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const uptadedCards = [...allCards];
    const cardIndex = uptadedCards.findIndex(card => card.id === cardId);
    uptadedCards[cardIndex].showTitle = !uptadedCards[cardIndex].showTitle;
    setAllCards(uptadedCards);
  }

  // useEffect(() => {
  //   apiGetAllFlashCards().then(setAllCards);
  // }, []);

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleButtonClick}>Embaralhar Cards</Button>
        </div>
        <div className="flex flex-row items-center justify-center space-x-4 m-4">
          <RadioButton
            id="radioButtonShowTitle"
            name="showInfo"
            buttonChecked={radioButtonShowTitle}
            onButtonClick={handleRadioShowTitleClick}
          >
            Mostrar título
          </RadioButton>
          <RadioButton
            id="radioButtonShowDescription"
            name="showInfo"
            buttonChecked={!radioButtonShowTitle}
            onButtonClick={handleRadioShowDescriptionClick}
          >
            Mostrar descrição
          </RadioButton>
        </div>
        <FlashCards>
          {allCards.map(({ id, title, description, showTitle }) => {
            return (
              <FlashCard
                key={id}
                id={id}
                title={title}
                description={description}
                showFlashCardTitle={showTitle}
                onToggleFlashCard={handleToggleFlashCard}
              />
            );
          })}
        </FlashCards>
      </Main>
    </>
  );
}
