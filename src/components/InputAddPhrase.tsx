interface InputAddPhraseProps {
  onSubmit: (text: string) => void;
}

export const InputAddPhrase = ({ onSubmit } : InputAddPhraseProps) => (
  <div className="mb-4">
    <h2>
      Add a phrase
    </h2>
    <form onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      onSubmit(formData.get('input') as string);
      e.currentTarget.reset();
    }}>
      <input
          type="text"
          name="input"
          className="border border-gray-300 rounded p-2 invalid:border-red-500"
          placeholder="Type something..."
          minLength={3}
        />
      </form>
  </div>
);
