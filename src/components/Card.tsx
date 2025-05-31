
interface CardProps {
  content: string;
  id: number;
  onDelete: (id: number) => void;
}

const Card = ({ content, id, onDelete }: CardProps) => (
  <li role="listitem" className="relative gap-6 rounded-xl border p-4 w-full max-w-sm">
    <button
      type="button"
      className="absolute right-4 top-1 hover:cursor-pointer"
      data-testid="delete-button"
      onClick={() => onDelete(id)}
    >
      <span>&times;</span>
    </button>
    <div className="overflow-hidden text-ellipsis">
      {content}
    </div>
  </li>
);

export default Card