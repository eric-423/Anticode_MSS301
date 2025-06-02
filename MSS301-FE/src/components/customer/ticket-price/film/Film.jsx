import DateNav from "./date-nav/DateNav";
import FilmCard from "./film-card/FilmCard";

const Film = () => {
  return (
    <div className="w-[1280px] mx-auto px-[16px] pt-[24px] pb-[48px] ">
        <DateNav />
        <section className="grid grid-cols-4 gap-6 mb-10">
            <FilmCard />
            <FilmCard />
            <FilmCard />
            <FilmCard />
            <FilmCard />
      </section>
    </div>
  );
};

export default Film;
