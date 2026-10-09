import { useEffect, useState } from "react";
import "./App.css";
import envelopeImage from "./assets/envelope.png";
import proposalWide from "./assets/proposal-wide.jpeg";
import proposalClose from "./assets/proposal-close.jpeg";
import hands from "./assets/hands.jpeg";

const invitation = {
  names: "Sinem & Oğuzhan",
  date: "12.12.2026",
  venue: "Schorenquelle 5, 6850 Dornbirn",
  mapsUrl:
    "https://www.google.com/maps/place//data=!4m2!3m1!1s0x479b14b62b205e77:0x9308c455c07f0faa?sa=X&ved=1t:8290&ictx=111",
};

const schedule = [
  ["17:00", "Karşılama"],
  ["17:30", "Birlikte Girişimiz"],
  ["19:00", "Dans ve Eğlence"],
  ["19:30", "Yüzük Merasimi"],
  ["20:00", "Yemek Servisi"],
  ["20:30", "Pasta Kesimi"],
  ["21:00", "Eğlence"],
  ["00:00", "Kapanış"],
];

function ArrowDown() {
  return (
    <span aria-hidden="true" className="arrow-down">
      ↓
    </span>
  );
}

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (isOpen) window.scrollTo({ top: 0, behavior: "instant" });
  }, [isOpen]);

  const openInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => setIsOpen(true), 720);
  };

  const shareInvitation = async () => {
    const shareData = {
      title: `${invitation.names} Nişan Davetiyesi`,
      text: `Nişanımızı birlikte kutlamak için seni de aramızda görmekten mutluluk duyarız. ${invitation.date}`,
      url: window.location.href,
    };

    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard?.writeText(window.location.href);
      window.alert("Bağlantı panoya kopyalandı.");
    }
  };

  if (!isOpen) {
    return (
      <main className="opening-screen">
        <section
          className="opening-content"
          aria-label="Nişan davetiyesini aç"
        >
          <p className="monogram">
            S <span>&amp;</span> O
          </p>
          <p className="opening-kicker">Size özel bir davetiye</p>
          <button
            className={`envelope-button ${isOpening ? "is-opening" : ""}`}
            onClick={openInvitation}
            aria-label="Davetiye aç"
            disabled={isOpening}
          >
            <img src={envelopeImage} alt="" />
          </button>
          <button
            className="tap-to-open"
            onClick={openInvitation}
            disabled={isOpening}
          >
            {isOpening ? "Açılıyor ..." : "Açmak için dokunun"}
            <ArrowDown />
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <img src={hands} alt="Sinemy ve Oğuzhan'ın elleri" />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">Nişanlanıyoruz</p>
          <h1 id="hero-title">{invitation.names}</h1>
          <p className="hero-date">{invitation.date}</p>
          <button
            className="hero-scroll"
            onClick={() =>
              document
                .querySelector("#invitation")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Detaylar için aşağı ininiz <ArrowDown />
          </button>
        </div>
      </section>

      <section
        className="paper-section invitation-section"
        id="invitation"
      >
        <p className="section-number">01</p>
        <p className="eyebrow ink">Sevgiyle</p>
        <h2>
          Yeni bir başlangıç,
          <br />
          <em>bir ömür boyu biz.</em>
        </h2>
        <div className="flourish">✦</div>
        <p className="body-copy">
          En güzel anımız sadece bir başlangıç. Bu mutluluğu, kalbimizde özel
          bir yere sahip olan sizlerle paylaşmak istiyoruz.
        </p>
        <p className="invitation-date">12.12.2026</p>
      </section>

      <section className="feature-photo photo-story">
        <img src={proposalWide} alt="Göl kıyısında evlilik teklifi" />
        <div className="photo-caption">
          <span>Bir an</span>
          <strong>sonsuza dek</strong>
        </div>
      </section>

      <section className="details-section">
        <p className="section-number">02</p>
        <h2 className="schedule-title">Nişan Akışı</h2>
        <p className="schedule-subtitle">Birlikte kutlayalım.</p>
        <div className="schedule-list">
          {schedule.map(([time, event]) => (
            <div className="schedule-row" key={time}>
              <time>{time}</time>
              <strong>{event}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="location-section">
        <p className="section-number">03</p>
        <p className="eyebrow ink">Konum</p>
        <h2>
          Buluşma
          <br />
          <em>noktamız.</em>
        </h2>
        <div className="location-card">
          <span className="location-mark">⌖</span>
          <p>Nişanımızı burada birlikte kutlayacağız.</p>
          <address>{invitation.venue}</address>
          <a
            className="maps-button"
            href={invitation.mapsUrl}
            target="_blank"
            rel="noreferrer"
          >
            Google Haritalar'da Aç <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-image">
          <img
            src={proposalClose}
            alt="Sinemy ve Oğuzhan evlilik teklifinde"
          />
        </div>
        <div className="closing-copy">
          <h2>
            Sizleri
            <br />
            <em>bekliyoruz.</em>
          </h2>
          <p>
            Sevgi, birbirine bakmak değil; birlikte aynı yöne bakmaktır.
          </p>
          <button
            className="share-button"
            onClick={() => void shareInvitation()}
          >
            Davetiyeyi Paylaş <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <footer>
        Sinem &amp; Oğuzhan <span>♡</span> 2026
      </footer>
    </main>
  );
}

export default App;
