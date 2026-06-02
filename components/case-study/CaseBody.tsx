export default function CaseBody({ text }: { text: string }) {
  const paragraphs = text.split("\n\n").filter(Boolean);

  return (
    <div className="text-[15px] leading-[1.75] text-muted max-w-[680px] mb-4">
      {paragraphs.map((p, i) => (
        <p key={i} className={i < paragraphs.length - 1 ? "mb-4" : ""}>
          {p}
        </p>
      ))}
    </div>
  );
}
