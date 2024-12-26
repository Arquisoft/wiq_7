import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer.js';

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const PlayContainer = () => {
  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>Game 1</h5>
          <p>Por su obra</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <p>Adivina el autor de la obra</p>
        </div>

        <footer className="actions">
          <Link to={`./game1`} className="btn">
            Play
          </Link>
        </footer>
      </div>
    </Wrapper>
  );
};

export default PlayContainer;
