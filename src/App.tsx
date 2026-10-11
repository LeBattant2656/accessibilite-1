import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", seatsLeft: 12, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", seatsLeft: 0, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", seatsLeft: 5, poster: posterOrbite },
];

export default function App() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const filteredFilms = useMemo(
    () => films.filter((film) => film.title.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  const toggleFavorite = (id: number) => {
    setFavorites((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  return (
    <>
      <header className="topbar">
        <div className="brand" onClick={() => setQuery("")}>CinéScope</div>
        <nav className="menu">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </nav>
      </header>

      <main className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <input
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => {
            const available = film.seatsLeft > 0;
            const seatsText = available ? `${film.seatsLeft} place${film.seatsLeft > 1 ? "s" : ""} restante${film.seatsLeft > 1 ? "s" : ""}` : "Complet";
            return (
              <div className="film-card" key={film.id}>
                <button
                  type="button"
                  className="film-select"
                  onClick={() => setSelected(film.title)}
                >
                  <img src={film.poster} alt={`Affiche du film ${film.title}`} />
                  <span className="film-overlay">Voir le film</span>
                  <span className="film-content">
                    <span className="film-title">{film.title}</span>
                    <span className="film-meta">{film.genre} · {film.time}</span>
                    <span className={available ? "seats seats-available" : "seats seats-full"}>{seatsText}</span>
                  </span>
                </button>
                <button
                  type="button"
                  className="favorite"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(film.id);
                  }}
                >
                  {favorites.includes(film.id) ? "★" : "☆"}
                </button>
              </div>
            );
          })}
        </div>

        {selected && <p className="selection">Film sélectionné : {selected}</p>}
      </main>
    </>
  );
}

