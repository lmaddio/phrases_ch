import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { setupStore } from './store';
import { initialState } from './slice';
import App from './App';

describe('App Component', () => {
  it('renders the initial state app', () => {
    render(
      <Provider store={setupStore({ phrases: initialState })}>
        <App />
      </Provider>
    );

    const addPhraseTitle = screen.getByText(/Add a phrase/i);
    expect(addPhraseTitle).toBeInTheDocument();

    const filterPhraseTitle = screen.getByText(/Filter the phrases/i);
    expect(filterPhraseTitle).toBeInTheDocument();

    const cardItems = screen.queryAllByRole('listitem');

    expect(cardItems).toHaveLength(3);
  });

  it('should delete a phrase', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={setupStore({ phrases: initialState })}>
        <App />
      </Provider>
    );

    const cardItems = screen.queryAllByRole('listitem');
    expect(cardItems).toHaveLength(3);

    const deleteButton = screen.getAllByTestId('delete-button')[0];
    await user.click(deleteButton);

    const updatedCardItems = screen.queryAllByRole('listitem');
    expect(updatedCardItems).toHaveLength(2);
  });

  it('should show a message when no phrases are found', () => {
    render(
      <Provider store={setupStore({ phrases: { phrases: [] } })}>
        <App />
      </Provider>
    );
    const noPhrasesMessage = screen.getByText(/No phrases found/i);
    expect(noPhrasesMessage).toBeInTheDocument();
  });

  it('should add a new phrase', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={setupStore({ phrases: initialState })}>
        <App />
      </Provider>
    );

    const inputAddPhrase = screen.getByPlaceholderText(/Type something/i);
    await user.type(inputAddPhrase, "testing new phrase{enter}");

    const newPhraseItem = screen.getByText(/testing New Phrase/i);
    expect(newPhraseItem).toBeInTheDocument();

    const cardItems = screen.queryAllByRole('listitem');

    expect(cardItems).toHaveLength(4);
  });

  it('should filter the phrases', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={setupStore({ phrases: initialState })}>
        <App />
      </Provider>
    );

    expect(screen.queryAllByRole('listitem')).toHaveLength(3);

    // Add new phrase
    const inputAddPhrase = screen.getByPlaceholderText(/Type something/i);
    await user.type(inputAddPhrase, "testing new phrase{enter}");
    expect(screen.queryAllByRole('listitem')).toHaveLength(4);

    // Filter added phrase
    const inputFilterPhrases = screen.getByPlaceholderText(/Filter phrases/i);
    await user.type(inputFilterPhrases, "testing new phrase");

    expect(screen.queryAllByRole('listitem')).toHaveLength(1);

    const newPhraseItem = screen.getByText(/testing New Phrase/i);
    expect(newPhraseItem).toBeInTheDocument();
  });
});
