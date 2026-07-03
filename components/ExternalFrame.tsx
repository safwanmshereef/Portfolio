type ExternalFrameProps = {
  title: string;
  src: string;
};

export default function ExternalFrame({ title, src }: ExternalFrameProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink/10 bg-white/70 shadow-anime">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3 font-mono text-xs font-bold uppercase text-plum">
        <span>{title}</span>
        <span>External Space</span>
      </div>
      <div className="aspect-[16/10] w-full bg-cream">
        <iframe
          title={title}
          src={src}
          className="h-full w-full"
          loading="lazy"
          allow="clipboard-read; clipboard-write"
        />
      </div>
    </div>
  );
}
