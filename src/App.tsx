import { useMemo, useState } from "react";
import posterAube from "./assets/aube.svg";
import posterMemoire from "./assets/memoire.svg";
import posterOrbite from "./assets/orbite.svg";

const films = [
  { id: 1, title: "Après l’aube", genre: "Drame", time: "18 h 10", available: true, poster: posterAube },
  { id: 2, title: "La mémoire des murs", genre: "Documentaire", time: "19 h 30", available: false, poster: posterMemoire },
  { id: 3, title: "Orbite 9", genre: "Science-fiction", time: "21 h 00", available: true, poster: posterOrbite },
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
      <div className="topbar">
        <div className="brand" onClick={() => setQuery("")}>CinéScope</div>
        <div className="menu">
          <a href="#programme">Programme</a>
          <a href="#infos">Informations</a>
        </div>
      </div>

      <div className="page">
        <h1>Films à l’affiche</h1>
        <p className="intro">Découvrez la programmation de cette semaine.</p>
        <input
          className="search"
          placeholder="Rechercher un film"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <div id="programme" className="film-grid">
          {filteredFilms.map((film) => (
            <div className="film-card" key={film.id} onClick={() => setSelected(film.title)}>
              <img src={film.poster} />
              <div className="film-content">
                <div className={film.available ? "availability available" : "availability unavailable"} />
                <h4>{film.title}</h4>
                <p>{film.genre} · {film.time}</p>
                <button
                  className="favorite"
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleFavorite(film.id);
                  }}
                >
                  {favorites.includes(film.id) ? "★" : "☆"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {selected && <p className="selection">Film sélectionné : {selected}</p>}
      </div>
    </>
  );
}

