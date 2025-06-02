import Header from "../../../components/customer/header/Header";
import FilmCard from "../../../components/customer/home/film/film-card/FilmCard";
import FilmNav from "../../../components/customer/home/film/film-nav/FilmNav";
import Trailer from "../../../components/customer/home/film/FilmTrailer/film-trailer";

const Film = () => {
    return (
        <div>
            <Header />
            <div className="w-[1280px] mx-auto px-[16px] pt-[24px] pb-[48px] ">
                <FilmNav />
                <section className="grid grid-cols-4 gap-6  mb-10">
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                    <FilmCard />
                </section>
                <Trailer />
            </div>
        </div>
    )
}

export default Film 