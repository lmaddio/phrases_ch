interface InputAddPhraseProps {
  onChange: (text: string) => void;
  value: string;
}

export const InputFilterPhrase = ({ onChange, value }: InputAddPhraseProps) => (
  <div>
    <h2>
      Filter the phrases
    </h2>
    <input
      type="text"
      name="filter"
      className="border border-gray-300 rounded p-2"
      placeholder="Filter phrases..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);