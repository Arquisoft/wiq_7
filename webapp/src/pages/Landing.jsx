import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1 data-testid="text-rendered">
            wiq <span>quiz</span> game
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            quas quidem itaque doloremque accusantium laudantium? Earum maiores
            consectetur vero eligendi, beatae reprehenderit recusandae placeat
            accusantium dignissimos deserunt sed quasi quisquam!
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn">
            Login
          </Link>
        </div>
        <img src={main} alt="wiq 7" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
