import styles from './Modal.module.css';
import { RickAndMortyCardProps } from '../../Pages/MainPage/MainPage';
import React from 'react';

type ModalProps = {
  cardState: RickAndMortyCardProps;
  setIsOpen: React.Dispatch<boolean>;
  episode?: [];
  location?: { name: string; url: string };
  origin?: { name: string; url?: string };
  type?: string;
};
const ModalWindow = ({ cardState, setIsOpen }: ModalProps) => {
  const { name, gender, created, species, status, image, episode, location, origin, type } =
    cardState;
  const onCloseModal = () => {
    setIsOpen(false);
    document.body.classList.remove('modalOpen');
  };
  return (
    <>
      <div className={styles.darkBackground} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h1>{name}</h1>
            <div className={styles.closeModal} onClick={onCloseModal}></div>
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
