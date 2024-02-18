import FlashCard from '../components/FlashCard';
import Header from './../components/Header';
import Main from './../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import RadioButton from '../components/RadioButton';
import { apiGetAllFlashCards } from '../services/apiService';
import { get } from '../services/httpService';

export default function FlashCardsPage() {
  // BackEnd
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    // Sintaxe Promise
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    // Sintaxe async/await
    async function getAllCards() {
      const backEndAllCards = await apiGetAllFlashCards();
      setAllCards(backEndAllCards);
      setLoading(false);
    }
    getAllCards();

    // Sintaxe IIFEE
    // (async function getAllCards() {
    //   const backEndAllCards = await apiGetAllFlashCards();
    //   setAllCards(backEndAllCards);
    // })();
  }, []);

  function handleShuffle() {
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards);
  }

  useEffect(() => {
    setStudyCards(allCards.map(card => ({ ...card, showTitle: true })));
  }, [allCards]);

  function handleRadioShowTitleClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({ ...card, showTitle: true, }));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(true);
  }

  function handleRadioShowDescriptionClick() {
    // prettier-ignore
    const updatedCards = 
      [...studyCards].map(card => ({ ...card, showTitle: false, }));

    setStudyCards(updatedCards);
    setRadioButtonShowTitle(false);
  }

  function handleToggleFlashCard(cardId) {
    const uptadedCards = [...studyCards];
    const cardIndex = uptadedCards.findIndex(card => card.id === cardId);
    uptadedCards[cardIndex].showTitle = !uptadedCards[cardIndex].showTitle;
    setStudyCards(uptadedCards);
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>
        <div className="text-center mb-4">
          <Button onButtonClick={handleShuffle}>Embaralhar Cards</Button>
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
          {studyCards.map(({ id, title, description, showTitle }) => {
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
