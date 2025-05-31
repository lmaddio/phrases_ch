import { useSelector } from "react-redux";
import { useState } from "react";

import { useAppDispatch } from "./store";
import type { RootState } from "./store";
import { addPhrase, deletePhrase } from "./slice";

import { InputAddPhrase } from "./components/InputAddPhrase";
import { InputFilterPhrase } from "./components/InputFilterPhrase";
import Card from "./components/Card";

function App() {
  const dispatch = useAppDispatch();
  const [phraseFilterValue, setPhraseFilterValue] = useState('');

  const phrases = useSelector((state: RootState) => {
    if (phraseFilterValue) {
      const filterLowerCase = phraseFilterValue.toLowerCase();

      return state.phrases.phrases.filter(phrase =>
        phrase.text.toLowerCase().includes(filterLowerCase)
      );
    }

    return state.phrases.phrases;
  });

  const onSubmitPhrase = (phrase: string) => {
    if (phrase) {
      setPhraseFilterValue('');
      dispatch(addPhrase(phrase));;
    }
  };

  const onDeletePhrase = (id: number) => {
    dispatch(deletePhrase(id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-4">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md mt-4 mb-8">
        <InputAddPhrase onSubmit={onSubmitPhrase} />
        <InputFilterPhrase
          value={phraseFilterValue}
          onChange={setPhraseFilterValue}
        />
      </div>
      <ul role="list" className="flex flex-wrap w-full justify-center items-center gap-4">
        {phrases.map(({ text, id }) => (
          <Card key={id} id={id} content={text} onDelete={onDeletePhrase} />
        ))}
        {phrases.length === 0 && (
          <li className="text-gray-500">No phrases found</li>
        )}
      </ul>
    </div>
  )
}

export default App
