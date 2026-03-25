import { useState } from "react";
import Icon from "@/components/ui/icon";

const STORIES_API = "https://functions.poehali.dev/efc75c63-7ea6-4754-90e6-4709c7cdf936";

type IconName = "Home" | "LayoutGrid" | "BookOpen" | "Heart" | "User" | "ChevronRight" | "ChevronLeft" | "X" | "ArrowRight" | "Star" | "Settings" | "Send" | "Shield" | "Check" | "Loader" | "Pencil";

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
    text: [
      "В самой глубине старого леса, где деревья были такими высокими, что их верхушки касались облаков, жила маленькая фея по имени Лира. Её крылья переливались серебром при лунном свете, а в руках она всегда держала крохотный фонарик из светлячков.",
      "Однажды ночью Лира заметила, что лунный свет, который обычно заливал поляну серебром, куда-то пропал. Лес погрузился в темноту, и все лесные жители испугались.",
      "— Что случилось с луной? — пискнул маленький ёжик, свернувшись в клубок под кустом бузины.",
      "— Не бойся, — сказала Лира и подняла свой фонарик повыше. — Я найду ответ.",
      "Она полетела выше и выше, минуя верхушки елей и берёз, пока не добралась до самого края леса, где начиналось ночное небо. И там она увидела его — огромное грустное облако, которое легло прямо на луну и закрыло её от мира.",
      "— Почему ты плачешь? — спросила Лира облако.",
      "— Меня никто не замечает, — вздохнуло облако, и с него упало несколько тяжёлых капель дождя. — Все смотрят только на луну и звёзды, а я просто плыву один.",
      "Лира задумалась. Потом она достала из своей сумочки горсть лунной пыли — той самой, которую феи собирают на рассвете — и рассыпала её прямо в облако.",
      "Облако засветилось изнутри мягким розовым светом. Оно было таким красивым, что все звёзды вокруг ахнули от восхищения.",
      "— Теперь тебя видят все, — улыбнулась Лира.",
      "Облако медленно поплыло в сторону, освобождая луну. А лесная поляна снова наполнилась серебряным светом. И с тех пор, когда на небе появляются светящиеся облака, лесные жители знают: это Лира подарила кому-то немного своего волшебства.",
    ],
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
    text: [
      "В башне старого замка на самой высокой полке пылилась книга. Не простая книга — в её кожаной обложке были спрятаны все заклинания мира. Но никто не мог её открыть, потому что замок на ней требовал не ключа, а правильного слова.",
      "Многие волшебники приходили и пробовали. Они произносили мудрёные слова на древних языках, рисовали магические знаки, варили зелья. Книга молчала.",
      "Однажды в замок забрела девочка по имени Маша. Она не была волшебницей — просто заблудилась во время прогулки. Увидев книгу, она взяла её в руки и сказала то, что говорят всем незнакомцам:",
      "— Здравствуй.",
      "Замок щёлкнул. Страницы сами собой распахнулись.",
      "Маша от удивления чуть не выронила книгу. На первой странице золотыми буквами было написано: «Самое сильное заклинание — это вежливость. Тот, кто это знает, достоин всех остальных».",
      "Маша читала всю ночь. Она узнала, как заставить дождь прекратиться, как найти потерянные вещи и как помочь грустному другу улыбнуться. Но самое полезное заклинание было в самом конце книги: «Слушай других внимательно — и ты поймёшь их без слов».",
      "Утром Маша положила книгу обратно на полку. Замок снова закрылся. Но она уже знала главное — и унесла это знание с собой домой.",
    ],
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
    text: [
      "Все драконы умели дышать огнём. Все, кроме Сола. Вместо огня у него вырывались маленькие мыльные пузыри — переливающиеся, радужные, невесомые. Другие драконы смеялись над ним.",
      "— Какой же ты дракон! — фыркал Горн, выпуская клуб оранжевого пламени. — Ты больше похож на мыльницу!",
      "Сол опускал голову и уходил в свою пещеру. Там он смотрел на свои пузыри и думал, что никогда не будет настоящим драконом.",
      "Но однажды в долину пришла беда. Лесной пожар — огромный, жадный, рычащий — пополз к деревне. Все драконы в ужасе улетели: их огонь только раздувал пламя сильнее.",
      "Только Сол остался.",
      "Он набрал побольше воздуха и выдохнул. Из его пасти вылетели тысячи пузырей — огромных, как воздушные шары. Они накрывали языки огня и лопались, выпуская влажный воздух. Пожар зашипел, засмолился и начал гаснуть.",
      "Жители деревни смотрели, как Сол кружит над огнём, выдыхая всё новые пузыри. К утру пожар был потушен.",
      "— Ты спас нас! — кричали люди.",
      "Горн прилетел последним. Он долго молчал, глядя на Сола.",
      "— Прости меня, — сказал он наконец. — Я не знал, что твой огонь сильнее моего.",
      "Сол улыбнулся и выдул маленький радужный пузырь. Тот поднялся высоко в небо и лопнул, рассыпав искры всех цветов радуги.",
    ],
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
    text: [
      "На дне тёплого моря жила русалочка Кора. Каждую ночь она всплывала на поверхность и смотрела на звёзды, отражавшиеся в воде. Одна звёздочка горела ярче всех — маленькая, голубая, мигающая.",
      "— Я хочу с тобой познакомиться, — говорила Кора, но звезда была слишком далеко.",
      "Однажды во время шторма звёздочка упала в море. Кора нашла её на морском дне — она лежала среди кораллов, тускло мерцая.",
      "— Тебе больно? — спросила Кора.",
      "— Мне холодно и одиноко, — прошептала звёздочка. — Я хочу домой, на небо.",
      "Кора думала недолго. Она собрала самых быстрых рыбок, самых сильных морских коньков и попросила их помочь. Они подняли звёздочку со дна и передавали её из рук в руки — всё выше и выше, до самой поверхности.",
      "Там Кора подбросила звёздочку в ночное небо со всей силой своего хвоста.",
      "Звёздочка взлетела — и вспыхнула ярче, чем когда-либо.",
      "— Спасибо! — донеслось сверху.",
      "С тех пор та звёздочка светит чуть ярче других. Моряки говорят, что она показывает дорогу домой. А Кора каждую ночь машет ей рукой со дна моря.",
    ],
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
    text: [
      "Рыжая лиса Веда умела делать одно волшебство — она умела находить потерянные вещи. Стоило ей покрутить пушистым хвостом три раза, как пропавшая вещь сама приходила к хозяину.",
      "Зайчонок Тима потерял любимую морковку. Он искал её повсюду — в норке, под кустами, у речки. Ничего.",
      "— Веда, помоги! — попросил он.",
      "Лиса покрутила хвостом раз, другой, третий. Ничего не произошло.",
      "— Странно, — нахмурилась Веда. — Обычно всегда работает.",
      "Она подумала и спросила: — А ты точно её потерял? Может, просто забыл, куда положил?",
      "Тима задумался. Потом вспомнил: — Ой! Я же сам её спрятал под большим камнем, чтобы никто не взял!",
      "Они пошли к камню — и конечно, морковка была там. Целая и невредимая.",
      "— Моё волшебство не работает на вещи, которые не потеряны, — засмеялась Веда. — Оно работает только на настоящие потери.",
      "— А как мне научиться не терять вещи? — спросил Тима.",
      "— Просто запоминай, куда кладёшь, — улыбнулась лиса и махнула хвостом. — Это самое лучшее волшебство.",
    ],
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
    text: [
      "Каждую ночь, когда все засыпали, мальчик Никита забирался на чердак и смотрел в телескоп. Он изучал звёзды так долго, что знал имя каждой из них.",
      "Однажды он заметил: одна звезда пропала. Маленькая, почти незаметная — но он помнил, что она всегда была между Большой Медведицей и созвездием Лиры.",
      "Никита записал в блокнот: «Звезда 7-Л исчезла. Ищу причину».",
      "Ночь за ночью он наблюдал. На третью ночь звезда появилась снова — но не на своём месте. Она медленно двигалась по небу.",
      "— Это не звезда, — прошептал Никита, приникнув к окуляру. — Это что-то живое.",
      "Существо — маленькое, светящееся, похожее на морского конька из света — кружило над городом. Оно, кажется, заблудилось.",
      "Никита вышел во двор и направил фонарик в небо — три вспышки, пауза, три вспышки. Сигнал, который он читал в книге о морзянке.",
      "Существо остановилось. Потом начало мигать в ответ: один-два-три, один-два-три.",
      "Они разговаривали так всю ночь — фонариком и звёздным светом. К рассвету Никита понял: существо ищет свою стаю, которая улетела к другому созвездию.",
      "Он навёл телескоп и нашёл их — целое облако таких же светящихся существ у края Млечного пути. Три вспышки в их сторону.",
      "Существо радостно мигнуло и умчалось.",
      "Никита смотрел ему вслед, пока рассвет не погасил звёзды. В блокноте он написал: «Звезда 7-Л найдена. Задание выполнено. Жду следующей ночи».",
    ],
  },
];

type Page = "home" | "catalog" | "categories" | "profile" | "library" | "submit" | "admin";

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [favorites, setFavorites] = useState<number[]>([1]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<typeof STORIES[0] | null>(null);
  const [readingStory, setReadingStory] = useState<typeof STORIES[0] | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredStories = selectedCategory
    ? STORIES.filter(s => s.category === selectedCategory)
    : STORIES;

  const favoriteStories = STORIES.filter(s => favorites.includes(s.id));

  const openReading = (story: typeof STORIES[0]) => {
    setActiveStory(null);
    setReadingStory(story);
  };

  if (readingStory) {
    return (
      <ReadingPage
        story={readingStory}
        isFav={favorites.includes(readingStory.id)}
        onFav={toggleFavorite}
        onBack={() => setReadingStory(null)}
      />
    );
  }

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
          onDoubleClick={() => setPage("admin")}
          className="flex items-center gap-2"
          title="Двойной клик — панель администратора"
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
            { id: "submit" as Page, label: "Опубликовать", icon: "Pencil" },
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
                    onRead={() => openReading(story)}
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
                  onRead={() => openReading(story)}
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
                    onRead={() => openReading(story)}
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

        {/* ФОРМА ПУБЛИКАЦИИ */}
        {page === "submit" && (
          <SubmitPage onBack={() => setPage("home")} />
        )}

        {/* ПАНЕЛЬ АДМИНИСТРАТОРА */}
        {page === "admin" && (
          <AdminPage />
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
              <button onClick={() => openReading(activeStory)} className="btn-fairy w-full py-3 rounded-2xl text-base font-semibold">
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
          { id: "submit" as Page, icon: "Pencil", label: "Написать" },
          { id: "library" as Page, icon: "Heart", label: "Моё" },
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

// ─── Форма публикации ──────────────────────────────────────────
function SubmitPage({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    title: "", author_name: "", author_email: "",
    category: "", age_range: "", read_time: "", emoji: "📖", story_text: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const set = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  const submit = async () => {
    if (!form.title || !form.author_name || !form.author_email || !form.category || !form.story_text) {
      setError("Заполните все обязательные поля"); return;
    }
    setStatus("loading"); setError("");
    try {
      const res = await fetch(STORIES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error"); setError("Ошибка отправки. Попробуйте ещё раз.");
    }
  };

  const inputStyle = {
    background: "hsla(230,30%,13%,1)",
    border: "1px solid hsla(45,85%,58%,0.15)",
    borderRadius: "0.75rem",
    color: "hsl(45,80%,88%)",
    padding: "0.65rem 1rem",
    width: "100%",
    fontFamily: "'Golos Text', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
  };

  if (status === "success") {
    return (
      <div className="max-w-xl mx-auto px-6 py-20 text-center animate-fade-in">
        <div className="text-6xl mb-4 animate-float">🌟</div>
        <h2 className="font-fairy text-3xl font-bold mb-3" style={{ color: "hsl(48,90%,78%)" }}>Сказка отправлена!</h2>
        <p className="mb-8" style={{ color: "hsl(240,20%,55%)" }}>Мы проверим её и опубликуем в каталоге в ближайшее время.</p>
        <button onClick={onBack} className="btn-fairy px-8 py-3 rounded-full font-semibold">На главную</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
      <div className="mb-8">
        <h1 className="font-fairy text-4xl font-bold mb-2" style={{ color: "hsl(48,90%,78%)" }}>✍️ Опубликовать сказку</h1>
        <p className="text-sm" style={{ color: "hsl(240,20%,55%)" }}>Расскажите свою историю — мы проверим и добавим в каталог</p>
      </div>

      <div className="space-y-4">
        {/* Об авторе */}
        <div className="card-fairy rounded-2xl p-5 space-y-3">
          <h3 className="font-fairy text-lg" style={{ color: "hsl(48,90%,72%)" }}>👤 Об авторе</h3>
          <input style={inputStyle} placeholder="Ваше имя *" value={form.author_name} onChange={e => set("author_name", e.target.value)} />
          <input style={inputStyle} placeholder="Email для связи *" type="email" value={form.author_email} onChange={e => set("author_email", e.target.value)} />
        </div>

        {/* О сказке */}
        <div className="card-fairy rounded-2xl p-5 space-y-3">
          <h3 className="font-fairy text-lg" style={{ color: "hsl(48,90%,72%)" }}>📖 О сказке</h3>
          <div className="flex gap-2">
            <input style={{ ...inputStyle, flex: 1 }} placeholder="Название сказки *" value={form.title} onChange={e => set("title", e.target.value)} />
            <input style={{ ...inputStyle, width: "70px", textAlign: "center", fontSize: "1.5rem" }} placeholder="📖" value={form.emoji} onChange={e => set("emoji", e.target.value)} maxLength={2} />
          </div>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={e => set("category", e.target.value)}>
            <option value="">Категория *</option>
            {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.icon} {c.name}</option>)}
          </select>
          <div className="flex gap-2">
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.age_range} onChange={e => set("age_range", e.target.value)}>
              <option value="">Возраст</option>
              {["3–5 лет", "4–7 лет", "5–8 лет", "6–9 лет", "7–10 лет", "8–12 лет"].map(a => <option key={a}>{a}</option>)}
            </select>
            <select style={{ ...inputStyle, cursor: "pointer" }} value={form.read_time} onChange={e => set("read_time", e.target.value)}>
              <option value="">Время чтения</option>
              {["5 мин", "10 мин", "15 мин", "20 мин", "25 мин", "30 мин"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Текст */}
        <div className="card-fairy rounded-2xl p-5">
          <h3 className="font-fairy text-lg mb-3" style={{ color: "hsl(48,90%,72%)" }}>✨ Текст сказки *</h3>
          <textarea
            style={{ ...inputStyle, minHeight: "220px", resize: "vertical" }}
            placeholder="Жил-был... Напишите вашу сказку здесь. Каждый абзац — отдельная строка."
            value={form.story_text}
            onChange={e => set("story_text", e.target.value)}
          />
          <p className="text-xs mt-2" style={{ color: "hsl(240,20%,45%)" }}>{form.story_text.length} символов</p>
        </div>

        {error && <p className="text-sm text-center" style={{ color: "hsl(0,70%,60%)" }}>{error}</p>}

        <button
          onClick={submit}
          disabled={status === "loading"}
          className="btn-fairy w-full py-3.5 rounded-2xl text-base font-semibold flex items-center justify-center gap-2"
          style={{ opacity: status === "loading" ? 0.7 : 1 }}
        >
          {status === "loading"
            ? <><Icon name="Loader" size={18} /> Отправляем...</>
            : <><Icon name="Send" size={18} /> Отправить на проверку</>}
        </button>
      </div>
    </div>
  );
}

// ─── Панель администратора ──────────────────────────────────────
type Submission = {
  id: number; title: string; author_name: string; author_email: string;
  category: string; age_range: string; read_time: string;
  story_text: string; emoji: string; status: string;
  admin_comment: string | null; created_at: string;
};

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selected, setSelected] = useState<Submission | null>(null);
  const [comment, setComment] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const login = async () => {
    setLoading(true); setAuthError("");
    try {
      const res = await fetch(`${STORIES_API}?admin=1&status=pending`, {
        headers: { "X-Admin-Token": password },
      });
      if (res.status === 403) { setAuthError("Неверный пароль"); setLoading(false); return; }
      const data = await res.json();
      setSubmissions(typeof data === "string" ? JSON.parse(data) : data);
      setAuthed(true);
    } catch { setAuthError("Ошибка подключения"); }
    setLoading(false);
  };

  const loadTab = async (t: typeof tab) => {
    setTab(t); setSelected(null); setLoading(true);
    const res = await fetch(`${STORIES_API}?admin=1&status=${t}`, {
      headers: { "X-Admin-Token": password },
    });
    const data = await res.json();
    setSubmissions(typeof data === "string" ? JSON.parse(data) : data);
    setLoading(false);
  };

  const decide = async (action: "approved" | "rejected") => {
    if (!selected) return;
    setActionLoading(true);
    await fetch(`${STORIES_API}?id=${selected.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "X-Admin-Token": password },
      body: JSON.stringify({ status: action, admin_comment: comment }),
    });
    setSelected(null); setComment("");
    await loadTab(tab);
    setActionLoading(false);
  };

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-6 py-20 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🛡️</div>
          <h1 className="font-fairy text-3xl font-bold mb-1" style={{ color: "hsl(48,90%,78%)" }}>Панель администратора</h1>
          <p className="text-sm" style={{ color: "hsl(240,20%,50%)" }}>Введите пароль для входа</p>
        </div>
        <div className="card-fairy rounded-2xl p-6 space-y-3">
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === "Enter" && login()}
            style={{ background: "hsla(230,30%,13%,1)", border: "1px solid hsla(45,85%,58%,0.15)", borderRadius: "0.75rem", color: "hsl(45,80%,88%)", padding: "0.65rem 1rem", width: "100%", fontFamily: "'Golos Text', sans-serif", outline: "none" }}
          />
          {authError && <p className="text-sm text-center" style={{ color: "hsl(0,70%,60%)" }}>{authError}</p>}
          <button onClick={login} disabled={loading} className="btn-fairy w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} /> {loading ? "Проверяем..." : "Войти"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-fairy text-3xl font-bold" style={{ color: "hsl(48,90%,78%)" }}>🛡️ Модерация</h1>
        <div className="flex gap-2">
          {(["pending", "approved", "rejected"] as const).map(t => (
            <button key={t} onClick={() => loadTab(t)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${tab === t ? "btn-fairy" : "border hover:bg-white/5"}`}
              style={tab !== t ? { borderColor: "hsla(45,85%,58%,0.2)", color: "hsl(240,20%,60%)" } : {}}>
              {t === "pending" ? "⏳ Ожидают" : t === "approved" ? "✅ Одобрены" : "❌ Отклонены"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16" style={{ color: "hsl(240,20%,50%)" }}>Загружаем...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">📭</div>
          <p className="font-fairy text-xl" style={{ color: "hsl(48,90%,65%)" }}>Заявок нет</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map(s => (
            <div key={s.id} className="card-fairy rounded-2xl p-5 cursor-pointer" onClick={() => { setSelected(s); setComment(""); }}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="text-xl mr-2">{s.emoji}</span>
                  <span className="font-fairy text-lg font-semibold" style={{ color: "hsl(48,90%,78%)" }}>{s.title}</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsla(45,85%,58%,0.1)", color: "hsl(45,80%,68%)" }}>{s.category}</span>
              </div>
              <p className="text-xs mb-2" style={{ color: "hsl(240,20%,50%)" }}>{s.author_name} · {s.author_email}</p>
              <p className="text-sm line-clamp-2" style={{ color: "hsl(240,20%,60%)" }}>{s.story_text.slice(0, 120)}...</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs" style={{ color: "hsl(240,20%,40%)" }}>{new Date(s.created_at).toLocaleDateString("ru")}</span>
                {tab === "pending" && <span className="text-xs" style={{ color: "hsl(45,85%,58%)" }}>Нажмите для проверки →</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Детальный просмотр */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(10,10,20,0.9)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelected(null)}>
          <div className="relative max-w-2xl w-full rounded-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
            style={{ background: "hsl(230,30%,11%)", border: "1px solid hsla(45,85%,58%,0.25)" }}
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: "hsla(240,20%,18%,1)" }}>
              <h2 className="font-fairy text-xl font-semibold" style={{ color: "hsl(48,90%,78%)" }}>
                {selected.emoji} {selected.title}
              </h2>
              <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10">
                <Icon name="X" size={16} style={{ color: "hsl(240,20%,60%)" }} />
              </button>
            </div>
            <div className="overflow-y-auto p-5 flex-1 space-y-3">
              <div className="flex gap-2 flex-wrap">
                {[selected.category, selected.age_range, selected.read_time].filter(Boolean).map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "hsla(45,85%,58%,0.1)", color: "hsl(45,80%,72%)" }}>{t}</span>
                ))}
              </div>
              <p className="text-xs" style={{ color: "hsl(240,20%,50%)" }}>Автор: <span style={{ color: "hsl(45,80%,75%)" }}>{selected.author_name}</span> · {selected.author_email}</p>
              <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap" style={{ background: "hsla(230,30%,8%,1)", color: "hsl(240,20%,70%)" }}>
                {selected.story_text}
              </div>
              {tab === "pending" && (
                <textarea
                  placeholder="Комментарий администратора (необязательно)"
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  style={{ background: "hsla(230,30%,13%,1)", border: "1px solid hsla(45,85%,58%,0.15)", borderRadius: "0.75rem", color: "hsl(45,80%,88%)", padding: "0.65rem 1rem", width: "100%", fontFamily: "'Golos Text', sans-serif", minHeight: "70px", resize: "none", outline: "none" }}
                />
              )}
            </div>
            {tab === "pending" && (
              <div className="flex gap-3 p-5 border-t" style={{ borderColor: "hsla(240,20%,18%,1)" }}>
                <button onClick={() => decide("rejected")} disabled={actionLoading}
                  className="flex-1 py-2.5 rounded-xl font-semibold text-sm border transition-all hover:bg-red-900/20"
                  style={{ borderColor: "hsla(0,70%,50%,0.3)", color: "hsl(0,70%,65%)" }}>
                  ❌ Отклонить
                </button>
                <button onClick={() => decide("approved")} disabled={actionLoading}
                  className="flex-1 btn-fairy py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2">
                  <Icon name="Check" size={15} /> Одобрить
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ReadingPage({
  story,
  isFav,
  onFav,
  onBack,
}: {
  story: typeof STORIES[0];
  isFav: boolean;
  onFav: (id: number) => void;
  onBack: () => void;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrolled = el.scrollTop;
    const total = el.scrollHeight - el.clientHeight;
    setScrollProgress(total > 0 ? Math.min(100, Math.round((scrolled / total) * 100)) : 0);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(230, 35%, 7%)", height: "100dvh" }}>
      {/* Звёзды */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="absolute rounded-full bg-white animate-twinkle"
            style={{ width: "1px", height: "1px", left: `${(i * 53) % 100}%`, top: `${(i * 31) % 100}%`, animationDelay: `${(i * 0.4) % 3}s`, opacity: 0.25 + (i % 4) * 0.08 }} />
        ))}
      </div>

      {/* Хедер */}
      <div
        className="flex-shrink-0 z-40 flex flex-col"
        style={{ background: "hsla(230,35%,5%,0.95)", borderBottom: "1px solid hsla(45,85%,58%,0.12)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <button onClick={onBack} className="flex items-center gap-2 nav-link transition-all hover:gap-3">
            <Icon name="ChevronLeft" size={20} />
            <span className="text-sm">Назад</span>
          </button>
          <span className="font-fairy text-base hidden sm:block" style={{ color: "hsl(48,90%,72%)" }}>
            {story.emoji} {story.title}
          </span>
          <button
            onClick={() => onFav(story.id)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
            style={{ background: isFav ? "hsla(45,85%,58%,0.2)" : "hsla(240,20%,18%,1)" }}
          >
            <Icon name="Heart" size={17}
              style={{ color: isFav ? "hsl(45,85%,58%)" : "hsl(240,20%,55%)", fill: isFav ? "hsl(45,85%,58%)" : "none" }} />
          </button>
        </div>

        {/* Прогресс-бар */}
        <div className="relative h-1 w-full" style={{ background: "hsla(240,20%,18%,1)" }}>
          <div
            className="absolute left-0 top-0 h-full transition-all duration-200"
            style={{
              width: `${scrollProgress}%`,
              background: "linear-gradient(90deg, hsl(45,85%,50%), hsl(48,90%,68%))",
              boxShadow: scrollProgress > 0 ? "0 0 8px hsla(45,85%,58%,0.6)" : "none",
            }}
          />
          {scrollProgress > 0 && scrollProgress < 100 && (
            <div
              className="absolute top-1/2 -translate-y-1/2 text-xs font-body font-semibold px-2 py-0.5 rounded-full transition-all duration-200"
              style={{
                left: `clamp(0px, calc(${scrollProgress}% - 20px), calc(100% - 44px))`,
                background: "hsl(45,85%,50%)",
                color: "hsl(230,35%,7%)",
              }}
            >
              {scrollProgress}%
            </div>
          )}
        </div>
      </div>

      {/* Прокручиваемый контент */}
      <div className="flex-1 overflow-y-auto scroll-area-inner" onScroll={handleScroll}>
        {/* Обложка */}
        <div className="relative h-56 sm:h-72 overflow-hidden flex-shrink-0">
          <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, hsl(230,35%,7%) 100%)" }} />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex gap-2 flex-wrap">
              {[story.category, story.age, `⏱ ${story.readTime}`, `⭐ ${story.rating}`].map(tag => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full"
                  style={{ background: "hsla(45,85%,58%,0.15)", color: "hsl(45,80%,78%)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Текст */}
        <div className="max-w-2xl mx-auto px-6 pb-20">
        <div className="mb-8 pt-2">
          <h1 className="font-fairy text-3xl sm:text-4xl font-bold mb-2 leading-tight" style={{ color: "hsl(48,90%,78%)" }}>
            {story.emoji} {story.title}
          </h1>
          <p className="text-sm" style={{ color: "hsl(240,20%,50%)" }}>{story.author}</p>
        </div>

        <div className="magic-divider mb-8" />

        <div className="space-y-5">
          {story.text.map((paragraph, i) => (
            <p
              key={i}
              className="animate-fade-in leading-relaxed"
              style={{
                color: "hsl(240,20%,75%)",
                fontSize: "1.05rem",
                fontFamily: "'Golos Text', sans-serif",
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "backwards",
                ...(paragraph.startsWith("—") ? { paddingLeft: "1rem", color: "hsl(45,70%,72%)", fontStyle: "italic" } : {}),
              }}
            >
              {i === 0 ? (
                <>
                  <span className="font-fairy float-left text-6xl leading-none mr-2 mt-1" style={{ color: "hsl(45,85%,58%)" }}>
                    {paragraph[0]}
                  </span>
                  {paragraph.slice(1)}
                </>
              ) : paragraph}
            </p>
          ))}
        </div>

        <div className="magic-divider my-10" />

        {/* Конец сказки */}
        <div className="text-center py-6">
          <div className="text-4xl mb-3 animate-float">✨</div>
          <p className="font-fairy text-xl italic mb-6" style={{ color: "hsl(48,90%,65%)" }}>Конец сказки</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={onBack} className="btn-fairy px-6 py-2.5 rounded-full font-semibold flex items-center gap-2">
              <Icon name="BookOpen" size={16} /> Другие сказки
            </button>
            <button
              onClick={() => onFav(story.id)}
              className="px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 border transition-all hover:bg-white/5"
              style={{ borderColor: "hsla(45,85%,58%,0.3)", color: isFav ? "hsl(45,85%,58%)" : "hsl(240,20%,60%)" }}
            >
              <Icon name="Heart" size={16} style={{ fill: isFav ? "hsl(45,85%,58%)" : "none", color: isFav ? "hsl(45,85%,58%)" : "hsl(240,20%,60%)" }} />
              {isFav ? "В библиотеке" : "Сохранить"}
            </button>
          </div>
        </div>
      </div>
      </div>
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