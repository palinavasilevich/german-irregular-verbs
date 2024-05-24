import { cn } from "@/lib/utils";

const SectionTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h2 className={cn("section-title mb-8 text-center mx-auto", className)}>
      {title}
    </h2>
  );
};

export default SectionTitle;
