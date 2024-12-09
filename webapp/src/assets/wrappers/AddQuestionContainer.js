import styled from 'styled-components';

const Wrapper = styled.section`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 2rem;
  column-gap: 2rem;

  margin: 0.5rem auto;
  padding: 1rem;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }
  @media (min-width: 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .generateDb {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
`;
export default Wrapper;
