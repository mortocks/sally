type CardProps = {
  children: React.ReactNode;
  actionItems?: React.ReactNode;
  title?: string;
  className?: string;
};

const Card = ({ children, title, actionItems, className = "" }: CardProps) => (
  <div className={`rounded-xl bg-white p-6 ${className}`}>
    <header className="mb-4 flex justify-between border-b pb-4">
      <div className="flex h-[40px] items-center rounded-xl">
        <span className="mr-3 h-full rounded bg-[#B5E4CA] px-2" />
        <span className="text-lg font-bold">{title}</span>
      </div>
      {actionItems}
    </header>
    <div className="flex flex-col">{children}</div>
  </div>
);

export default Card;
