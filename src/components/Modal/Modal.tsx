import styles from './Modal.module.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCardModalId, getCurrentPage, getSearchValue } from '../../Features/Selectors';
import { useGetAllCharactersQuery } from '../../Features/FetchApi';
import { useAppSelector } from '../../hooks';
import { RickAndMortyCardProps } from '../../shared/interfaces';


type ModalProps = {
  onClose: () => void;
};
const ModalWindow = ({ onClose }: ModalProps) => {
  const searchValue = useAppSelector(getSearchValue);
  const currentPage = useAppSelector(getCurrentPage);
  const cardId = useAppSelector(getCardModalId);
  const { data: cards } = useGetAllCharactersQuery({ searchValue, currentPage });

  const card = cards?.results.find((card) => card.id === cardId);

  console.log(card);
  const { name, gender, created, species, status, image, location, origin, type } =
    card as RickAndMortyCardProps;

  const onCloseModal = () => {
    onClose();
    document.body.classList.remove('modalOpen');
  };
  return (
    <>
      <div className={styles.darkBackground} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1>{name}</h1>
            <div data-testid="closeTest" className={styles.closeModal} onClick={onCloseModal}></div>
          </div>

          <img src={image} alt="" />
          <div className={styles.modalContent}>
            <div className={styles.statusSpecies}>
              <h3>Species</h3> <h3>Status</h3>
            </div>
            <div className={styles.statusSpecies + ' ' + styles.speciesPanel}>
              <p className={styles.contentPanel}>{species}</p>
              <p
                className={
                  styles.contentPanel +
                  ' ' +
                  (status !== 'Dead' ? styles.status : styles.statusDead)
                }
              >
                {status}
              </p>
            </div>

            <h3>Gender</h3>
            <p className={styles.contentPanel}> {gender}</p>
            <h3>Date of create</h3>
            <p className={styles.contentPanel}>{created.split('T')[0]}</p>

            <h3>Last location</h3>
            <p className={styles.contentPanel}>{location?.name}</p>
            <h3>Origin</h3>
            <p className={styles.contentPanel}>{origin?.name}</p>
            <p>{type}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;
