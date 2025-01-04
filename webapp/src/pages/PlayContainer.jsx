import Wrapper from '../assets/wrappers/MenuContainer';
import GameMenuItem from '../components/GameMenuItem';

const PlayContainer = () => {
  return (
    <>
      <h4>play</h4>
      <Wrapper>
        <div className="items">
          <GameMenuItem
            title="Por su obra lo conocerán"
            description="Adivina el autor de la obra"
            path="./game1"
          />
          <GameMenuItem
            title="Descubriendo ciudades"
            description="Adivina la ciudad mediante pistas"
            path="./game2"
          />
        </div>
      </Wrapper>
    </>
  );
};

export default PlayContainer;
