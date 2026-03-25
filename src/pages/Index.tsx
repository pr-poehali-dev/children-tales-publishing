import { useState } from "react";
import Icon from "@/components/ui/icon";

type IconName = "Home" | "LayoutGrid" | "BookOpen" | "Heart" | "User" | "ChevronRight" | "X" | "ArrowRight" | "Star" | "Settings";

const FOREST_IMG = "https://cdn.poehali.dev/projects/b1cb1072-b10b-43b8-9d13-e527970cd9e7/files/92a33bb1-8e41-42c2-a23b-d30aa471ef44.jpg";
const BOOK_IMG = "https://cdn.poehali.dev/projects/b1cb1072-b10b-43b8-9d13-e527970cd9e7/files/cbdbb1bb-6aed-48ac-b302-505b44f2ff49.jpg";
const DRAGON_IMG = "https://cdn.poehali.dev/projects/b1cb1072-b10b-43b8-9d13-e527970cd9e7/files/cb79d4e7-fa31-402d-a619-f2581591bcd6.jpg";

const CATEGORIES = [
  { icon: "🐉", name: "Драконы и рыцари", count: 24, color: "from-red-900/40 to-orange-900/30" },
  { icon: "🧚", name: "Феи и эльфы", count: 18, color: "from-purple-900/40 to-pink-900/30" },
  { icon: "🌊", name: "Морские приключения", count: 15, color: "from-blue-900/40 to-cyan-900/30" },
  { icon: "🏰", name: "Волшебные замки", count: 21, color: "from-yellow-900/40 to-amber-900/30" },
  { icon: "🦊", name: "Говорящие животные", count: 32, color: "from-green-900/40 to-emerald-900/30" },
  { icon: "⭐", name: "Звёздные истории", count: 11, color: "from-indigo-900/40 to-violet-900/30" },
];

const STORIES = [
  {
    id: 1,
    title: "Тайна Лунного леса",
    author: "Елена Мирная",
    category: "Феи и эльфы",
    age: "5–8 лет",
    readTime: "15 мин",
    img: FOREST_IMG,
    rating: 4.9,
    emoji: "🌙",
  },
  {
    id: 2,
    title: "Книга всех заклинаний",
    author: "Максим Орлов",
    category: "Волшебные замки",
    age: "7–10 лет",
    readTime: "20 мин",
    img: BOOK_IMG,
    rating: 4.7,
    emoji: "📖",
  },
  {
    id: 3,
    title: "Дракон по имени Сол",
    author: "Анна Светлова",
    category: "Драконы и рыцари",
    age: "6–9 лет",
    readTime: "18 мин",
    img: DRAGON_IMG,
    rating: 4.8,
    emoji: "🐉",
  },
  {
    id: 4,
    title: "Русалка и звезда",
    author: "Иван Горский",
    category: "Морские приключения",
    age: "4–7 лет",
    readTime: "12 мин",
    img: FOREST_IMG,
    rating: 4.6,
    emoji: "⭐",
  },
  {
    id: 5,
    title: "Лиса-волшебница",
    author: "Ольга Краснова",
    category: "Говорящие животные",
    age: "3–6 лет",
    readTime: "10 мин",
    img: BOOK_IMG,
    rating: 4.9,
    emoji: "🦊",
  },
  {
    id: 6,
    title: "Звёздный страж",
    author: "Пётр Звёздный",
    category: "Звёздные истории",
    age: "8–12 лет",
    readTime: "25 мин",
    img: DRAGON_IMG,
    rating: 4.5,
    emoji: "🌟",
  },
];

type Page = "home" | "catalog" | "categories" | "profile" | "library";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<typeof STORIES[0] | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredStories = selectedCategory
    ? STORIES.filter(s => s.category === selectedCategory)
    : STORIES;

  const favoriteStories = STORIES.filter(s => favorites.includes(s.id));

  return (
    <div className="min-h-screen" style={{ background: "hsl(230, 35%, 7%)" }}>
      {/* Декоративные звёзды */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              width: i % 5 === 0 ? "2px" : "1px",
              height: i % 5 === 0 ? "2px" : "1px",
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 60}%`,
              animationDelay: `${(i * 0.3) % 3}s`,
              opacity: 0.3 + (i % 5) * 0.1,
            }}
          />
        ))}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(45,85%,58%), transparent)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, hsl(270,40%,50%), transparent)" }}
        />
      </div>

      {/* Навигация */}
      <nav
        className="relative z-50 flex items-center justify-between px-6 py-4"
        style={{
          borderBottom: "1px solid hsla(45,85%,58%,0.12)",
          background: "hsla(230,35%,5%,0.8)",
          backdropFilter: "blur(12px)",
        }}
      >
        <button
          onClick={() => { setPage("home"); setSelectedCategory(null); }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl">✨</span>
          <span className="font-fairy text-xl font-semibold text-gold-light hidden sm:block">Сказочный Мир</span>
        </button>
        <div className="flex items-center gap-1 sm:gap-2">
          {[
            { id: "home" as Page, label: "Главная", icon: "Home" },
            { id: "categories" as Page, label: "Категории", icon: "LayoutGrid" },
            { id: "catalog" as Page, label: "Каталог", icon: "BookOpen" },
            { id: "library" as Page, label: "Библиотека", icon: "Heart" },
            { id: "profile" as Page, label: "Профиль", icon: "User" },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSelectedCategory(null); }}
              className={`nav-link flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all ${page === item.id ? "active bg-gold/10" : "hover:bg-white/5"}`}
            >
              <Icon name={item.icon as IconName} size={16} />
              <span className="hidden md:block">{item.label}</span>
              {item.id === "library" && favorites.length > 0 && (
                <span className="ml-0.5 text-xs font-bold bg-gold/20 rounded-full w-4 h-4 flex items-center justify-center" style={{ color: "hsl(45,85%,58%)" }}>
                  {favorites.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Контент страниц */}
      <main className="relative z-10">

        {/* ГЛАВНАЯ */}
        {page === "home" && (
          <div>
            {/* Hero */}
            <section className="relative overflow-hidden px-6 py-20 text-center">
              <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
                <div className="animate-float text-7xl mb-6">🌙</div>
                <h1
                  className="font-fairy text-5xl sm:text-7xl font-bold mb-4 leading-tight"
                  style={{ color: "hsl(48,90%,78%)", textShadow: "0 0 40px hsla(45,85%,58%,0.4)" }}
                >
                  Сказочный Мир
                </h1>
                <p className="text-lg sm:text-xl mb-2 font-fairy italic" style={{ color: "hsl(270,30%,70%)" }}>
                  Где каждая страница — это волшебное приключение
                </p>
                <p className="text-sm mb-10" style={{ color: "hsl(240,20%,55%)" }}>
                  Более 120 сказок для детей от 3 до 12 лет
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button onClick={() => setPage("catalog")} className="btn-fairy px-8 py-3 rounded-full text-base font-semibold">
                    Читать сказки
                  </button>
                  <button
                    onClick={() => setPage("categories")}
                    className="px-8 py-3 rounded-full text-base border transition-all hover:bg-white/5"
                    style={{ borderColor: "hsla(45,85%,58%,0.3)", color: "hsl(45,85%,70%)" }}
                  >
                    Категории
                  </button>
                </div>
              </div>
              <div className="absolute inset-0 opacity-10">
                <img src={FOREST_IMG} alt="" className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, transparent 0%, hsl(230,35%,7%) 100%)" }}
              />
            </section>

            <div className="magic-divider mx-12 mb-16" />

            {/* Популярные */}
            <section className="px-6 pb-16 max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-fairy text-3xl font-semibold" style={{ color: "hsl(48,90%,78%)" }}>
                  ✨ Популярные сказки
                </h2>
                <button onClick={() => setPage("catalog")} className="text-sm nav-link flex items-center gap-1">
                  Все сказки <Icon name="ChevronRight" size={14} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {STORIES.slice(0, 3).map((story, i) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    isFav={favorites.includes(story.id)}
                    onFav={toggleFavorite}
                    onRead={() => setActiveStory(story)}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </section>

            {/* Категории preview */}
            <section className="px-6 pb-20 max-w-6xl mx-auto">
              <h2 className="font-fairy text-3xl font-semibold mb-8" style={{ color: "hsl(48,90%,78%)" }}>
                🏰 Волшебные миры
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {CATEGORIES.map((cat, i) => (
                  <button
                    key={cat.name}
                    onClick={() => { setSelectedCategory(cat.name); setPage("catalog"); }}
                    className={`card-fairy rounded-2xl p-5 text-left bg-gradient-to-br ${cat.color} transition-all`}
                    style={{ animationDelay: `${i * 0.08}s` }}
                  >
                    <div className="text-3xl mb-2">{cat.icon}</div>
                    <div className="font-body font-semibold text-sm mb-1" style={{ color: "hsl(45,80%,85%)" }}>{cat.name}</div>
                    <div className="text-xs" style={{ color: "hsl(240,20%,55%)" }}>{cat.count} сказок</div>
                  </button>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* КАТЕГОРИИ */}
        {page === "categories" && (
          <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
            <div className="mb-10">
              <h1 className="font-fairy text-4xl sm:text-5xl font-bold mb-2" style={{ color: "hsl(48,90%,78%)" }}>
                🏰 Волшебные категории
              </h1>
              <p className="text-sm" style={{ color: "hsl(240,20%,55%)" }}>Выбери мир, в который хочешь попасть</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CATEGORIES.map((cat, i) => (
                <button
                  key={cat.name}
                  onClick={() => { setSelectedCategory(cat.name); setPage("catalog"); }}
                  className={`card-fairy rounded-2xl p-6 text-left bg-gradient-to-br ${cat.color} group`}
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="text-4xl mb-3 transition-transform group-hover:scale-110">{cat.icon}</div>
                  <div className="font-fairy text-xl font-semibold mb-1" style={{ color: "hsl(45,80%,85%)" }}>{cat.name}</div>
                  <div className="text-xs mb-4" style={{ color: "hsl(240,20%,55%)" }}>{cat.count} сказок</div>
                  <div className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(45,85%,58%)" }}>
                    Читать <Icon name="ArrowRight" size={14} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* КАТАЛОГ */}
        {page === "catalog" && (
          <div className="max-w-6xl mx-auto px-6 py-12 animate-fade-in">
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="font-fairy text-4xl sm:text-5xl font-bold mb-1" style={{ color: "hsl(48,90%,78%)" }}>
                  📖 {selectedCategory || "Все сказки"}
                </h1>
                <p className="text-sm" style={{ color: "hsl(240,20%,55%)" }}>{filteredStories.length} сказок</p>
              </div>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm nav-link flex items-center gap-1 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5"
                >
                  <Icon name="X" size={14} /> Все категории
                </button>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scroll-area-inner">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${!selectedCategory ? "btn-fairy" : "border hover:bg-white/5"}`}
                style={!selectedCategory ? {} : { borderColor: "hsla(45,85%,58%,0.2)", color: "hsl(240,20%,60%)" }}
              >
                Все
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all flex-shrink-0 ${selectedCategory === cat.name ? "btn-fairy" : "border hover:bg-white/5"}`}
                  style={selectedCategory === cat.name ? {} : { borderColor: "hsla(45,85%,58%,0.2)", color: "hsl(240,20%,60%)" }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredStories.map((story, i) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  isFav={favorites.includes(story.id)}
                  onFav={toggleFavorite}
                  onRead={() => setActiveStory(story)}
                  delay={i * 0.07}
                />
              ))}
            </div>
          </div>
        )}

        {/* БИБЛИОТЕКА */}
        {page === "library" && (
          <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
            <div className="mb-10">
              <h1 className="font-fairy text-4xl sm:text-5xl font-bold mb-2" style={{ color: "hsl(48,90%,78%)" }}>
                💛 Моя библиотека
              </h1>
              <p className="text-sm" style={{ color: "hsl(240,20%,55%)" }}>
                {favoriteStories.length > 0
                  ? `${favoriteStories.length} любимых сказок`
                  : "Нажми ♡ на сказке, чтобы сохранить её здесь"}
              </p>
            </div>

            {favoriteStories.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4 animate-float">📚</div>
                <p className="font-fairy text-2xl mb-2" style={{ color: "hsl(48,90%,65%)" }}>Библиотека пуста</p>
                <p className="text-sm mb-6" style={{ color: "hsl(240,20%,50%)" }}>Добавляй сказки нажав на сердечко</p>
                <button onClick={() => setPage("catalog")} className="btn-fairy px-6 py-2.5 rounded-full">
                  Перейти в каталог
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {favoriteStories.map((story, i) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    isFav={true}
                    onFav={toggleFavorite}
                    onRead={() => setActiveStory(story)}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ПРОФИЛЬ */}
        {page === "profile" && (
          <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
            <h1 className="font-fairy text-4xl sm:text-5xl font-bold mb-10" style={{ color: "hsl(48,90%,78%)" }}>
              🧙 Профиль
            </h1>

            <div className="card-fairy rounded-3xl p-8 mb-6 text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl"
                style={{
                  background: "linear-gradient(135deg, hsl(270,40%,25%), hsl(230,35%,15%))",
                  border: "2px solid hsla(45,85%,58%,0.3)",
                }}
              >
                🧚
              </div>
              <h2 className="font-fairy text-2xl font-semibold mb-1" style={{ color: "hsl(48,90%,78%)" }}>Маленький читатель</h2>
              <p className="text-sm" style={{ color: "hsl(240,20%,50%)" }}>Добро пожаловать в сказочный мир!</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Прочитано", value: "12", icon: "📖" },
                { label: "В библиотеке", value: String(favorites.length), icon: "💛" },
                { label: "Дней подряд", value: "5", icon: "🔥" },
              ].map(stat => (
                <div key={stat.label} className="card-fairy rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="font-fairy text-2xl font-bold" style={{ color: "hsl(45,85%,58%)" }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: "hsl(240,20%,50%)" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="card-fairy rounded-2xl overflow-hidden">
              {[
                { icon: "Heart", label: "Моя библиотека", badge: String(favorites.length), action: () => setPage("library") },
                { icon: "BookOpen", label: "История чтения", badge: "12", action: () => {} },
                { icon: "Star", label: "Мои отзывы", badge: "3", action: () => {} },
                { icon: "Settings", label: "Настройки", badge: "", action: () => {} },
              ].map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors text-left"
                  style={{ borderBottom: i < 3 ? "1px solid hsla(240,20%,18%,1)" : "none" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "hsla(45,85%,58%,0.1)" }}
                    >
                      <Icon name={item.icon as IconName} size={16} style={{ color: "hsl(45,85%,58%)" }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: "hsl(45,80%,85%)" }}>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "hsla(45,85%,58%,0.15)", color: "hsl(45,85%,68%)" }}
                      >
                        {item.badge}
                      </span>
                    )}
                    <Icon name="ChevronRight" size={16} style={{ color: "hsl(240,20%,45%)" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Модальное окно сказки */}
      {activeStory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,20,0.85)", backdropFilter: "blur(8px)" }}
          onClick={() => setActiveStory(null)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl overflow-hidden animate-slide-up"
            style={{ background: "hsl(230,30%,11%)", border: "1px solid hsla(45,85%,58%,0.25)" }}
            onClick={e => e.stopPropagation()}
          >
            <img src={activeStory.img} alt={activeStory.title} className="w-full h-52 object-cover" />
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setActiveStory(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(10,10,20,0.7)" }}
              >
                <Icon name="X" size={16} style={{ color: "white" }} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-fairy text-2xl font-semibold mb-1" style={{ color: "hsl(48,90%,78%)" }}>
                    {activeStory.emoji} {activeStory.title}
                  </h3>
                  <p className="text-sm" style={{ color: "hsl(240,20%,55%)" }}>{activeStory.author}</p>
                </div>
                <button
                  onClick={() => toggleFavorite(activeStory.id)}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: favorites.includes(activeStory.id) ? "hsla(45,85%,58%,0.2)" : "hsla(240,20%,18%,1)" }}
                >
                  <Icon
                    name="Heart"
                    size={18}
                    style={{
                      color: favorites.includes(activeStory.id) ? "hsl(45,85%,58%)" : "hsl(240,20%,55%)",
                      fill: favorites.includes(activeStory.id) ? "hsl(45,85%,58%)" : "none",
                    }}
                  />
                </button>
              </div>
              <div className="flex gap-2 mb-5 flex-wrap">
                {[activeStory.category, activeStory.age, `⏱ ${activeStory.readTime}`, `⭐ ${activeStory.rating}`].map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ background: "hsla(45,85%,58%,0.1)", color: "hsl(45,80%,72%)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button className="btn-fairy w-full py-3 rounded-2xl text-base font-semibold">
                Начать читать
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Нижний бар на мобилке */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden flex justify-around py-3 px-4"
        style={{
          background: "hsla(230,35%,5%,0.95)",
          borderTop: "1px solid hsla(45,85%,58%,0.12)",
          backdropFilter: "blur(12px)",
        }}
      >
        {[
          { id: "home" as Page, icon: "Home", label: "Главная" },
          { id: "catalog" as Page, icon: "BookOpen", label: "Каталог" },
          { id: "library" as Page, icon: "Heart", label: "Библиотека" },
          { id: "profile" as Page, icon: "User", label: "Профиль" },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => { setPage(item.id); setSelectedCategory(null); }}
            className="flex flex-col items-center gap-1 transition-all"
            style={{ color: page === item.id ? "hsl(45,85%,58%)" : "hsl(240,20%,50%)" }}
          >
            <Icon name={item.icon as IconName} size={20} />
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="h-20 md:hidden" />
    </div>
  );
}

function StoryCard({
  story,
  isFav,
  onFav,
  onRead,
  delay = 0,
}: {
  story: typeof STORIES[0];
  isFav: boolean;
  onFav: (id: number) => void;
  onRead: () => void;
  delay?: number;
}) {
  return (
    <div
      className="card-fairy rounded-2xl overflow-hidden animate-slide-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: "backwards" }}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={story.img}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, hsla(230,30%,8%,0.8) 0%, transparent 60%)" }}
        />
        <button
          onClick={() => onFav(story.id)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
          style={{ background: "rgba(10,10,20,0.6)", backdropFilter: "blur(4px)" }}
        >
          <Icon
            name="Heart"
            size={15}
            style={{
              color: isFav ? "hsl(45,85%,58%)" : "white",
              fill: isFav ? "hsl(45,85%,58%)" : "none",
            }}
          />
        </button>
        <div className="absolute bottom-2 left-3">
          <span
            className="text-xs px-2 py-0.5 rounded-full font-body"
            style={{ background: "hsla(45,85%,58%,0.2)", color: "hsl(45,85%,78%)" }}
          >
            {story.age}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-fairy text-lg font-semibold mb-1 leading-snug" style={{ color: "hsl(48,90%,82%)" }}>
          {story.emoji} {story.title}
        </h3>
        <p className="text-xs mb-3" style={{ color: "hsl(240,20%,50%)" }}>
          {story.author} · {story.readTime}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "hsl(240,20%,45%)" }}>{story.category}</span>
          <button onClick={onRead} className="btn-fairy text-xs px-4 py-1.5 rounded-full font-semibold">
            Читать
          </button>
        </div>
      </div>
    </div>
  );
}