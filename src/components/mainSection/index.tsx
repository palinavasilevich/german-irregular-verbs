import SectionTitle from "../sectionTitle";

const MainSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid items-center pb-8 pt-6 md:py-8 container gap-2">
      <div className="w-full overflow-hidden">
        <SectionTitle title="German Irregular Verbs" />
        {children}
      </div>
    </section>
  );
};

export default MainSection;
