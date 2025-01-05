import styled from 'styled-components';

const Wrapper = styled.div`
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  box-shadow: var(--shadow-2);

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .list-item {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: var(--text-secondary-color);
  }

  a {
    color: var(--primary-500);
    text-transform: capitalize;
  }
`;

export default Wrapper;
