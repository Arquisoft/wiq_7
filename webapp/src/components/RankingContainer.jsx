import { FaStar } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/RankingContainer';

const StatsContainer = ({ ranking }) => {
  const rankingData = ranking;

  return (
    <Wrapper>
      {rankingData && rankingData.length > 0 ? (
        <>
          <h5>hall of fame</h5>
          <div className="list">
            {rankingData.map((entry, index) => (
              <div className="list">
                <div className="list-item headers">
                  <span>
                    <strong>User</strong>
                  </span>
                  <span>
                    <strong>Score</strong>
                  </span>
                  <span>
                    <strong>Time</strong>
                  </span>
                </div>
                {rankingData.map((entry, index) => (
                  <div
                    className="list-item"
                    key={`${entry.gameId}-${entry.userId}`}
                  >
                    <span>{entry.username}</span>
                    <span>{entry.totalPoints}</span>
                    <span>{entry.totalTime} ms</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No ranking data available</p>
      )}
    </Wrapper>
  );
};

export default StatsContainer;
