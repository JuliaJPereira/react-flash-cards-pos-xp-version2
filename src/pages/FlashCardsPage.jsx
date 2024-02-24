import FlashCard from '../components/FlashCard';
import Header from './../components/Header';
import Main from './../components/Main';
import FlashCards from '../components/FlashCards';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { helperShuffleArray } from '../helpers/arrayHelpers';
import RadioButton from '../components/RadioButton';
import {
  apiDeleteFlashCard,
  apiGetAllFlashCards,
} from '../services/apiService';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import FlashCardItem from '../components/FlashCardItem';
import FlashCardForm from '../components/FlashCardForm';
import { getNewId } from '../services/idService';

export default function FlashCardsPage() {
  // BackEnd
  const [allCards, setAllCards] = useState([]);

  // Exclusivo para "Estudo"
  const [studyCards, setStudyCards] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState(null);

  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);

  useEffect(() => {
    // Sintaxe Promise
    // apiGetAllFlashCards().then(allFlashCards => {
    //   setAllCards(allFlashCards);
    // });

    // Sintaxe async/await
    async function getAllCards() {
      try {
        const backEndAllCards = await apiGetAllFlashCards();
        setAllCards(backEndAllCards);
        setTimeout(() => {
          setLoading(false);
        }, 500);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
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

  async function handleDeleteFlashCard(cardId) {
    try {
      // Exclusão no BackEnd
      await apiDeleteFlashCard(cardId);

      // Exclusão no FrontEnd
      setAllCards(allCards.filter(card => card.id !== cardId));
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditFlashCard(card) {
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }

  function handleNewFlashCard() {
    setCreateMode(true);
    setSelectedFlashCard(null);
  }

  function handleTabSelect(tabIndex) {
    setSelectedTab(tabIndex);
  }

  function handlePersist({ title, description }) {
    if (createMode) {
      const newFlashCard = { id: getNewId(), title, description };
      setAllCards([...allCards, newFlashCard]);
    } else {
      setAllCards(
        allCards.map(card => {
          if (card.id === selectedFlashCard.id) {
            return { ...card, title, description };
          }
          return card;
        })
      );
      setSelectedFlashCard(null);
      setCreateMode(true);
    }
  }

  let mainJsx = (
    <div className="flex justify-center my-4">
      <Loading />
    </div>
  );

  if (error) {
    mainJsx = <Error>{error}</Error>;
  }

  if (!loading) {
    mainJsx = (
      <>
        <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
          <TabList>
            <Tab>Listagem</Tab>
            <Tab>Cadastro</Tab>
            <Tab>Estudo</Tab>
          </TabList>

          <TabPanel>
            {allCards.map(flashCard => {
              return (
                <FlashCardItem
                  key={flashCard.id}
                  onDelete={handleDeleteFlashCard}
                  onEdit={handleEditFlashCard}
                >
                  {flashCard}
                </FlashCardItem>
              );
            })}
          </TabPanel>
          <TabPanel>
            <div className="my-4">
              <Button onButtonClick={handleNewFlashCard}>
                Novo flash card
              </Button>
            </div>
            <FlashCardForm createMode={createMode} onPersist={handlePersist}>
              {selectedFlashCard}
            </FlashCardForm>
          </TabPanel>
          <TabPanel>
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
          </TabPanel>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <Header>react-flash-cards-v2</Header>
      <Main>{mainJsx}</Main>
    </>
  );
}
