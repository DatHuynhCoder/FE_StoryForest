import React, { use, useEffect, useState } from "react";
import styles from "../AdvancedSearch/AdvancedSearch.module.css";
import { api, apiAuth } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { TbReload } from "react-icons/tb";

function AdvancedSearch() {
  // Router hooks
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  //get user
  const user = useSelector((state) => state.user.user);

  // State for query parameters
  const [type, setType] = useState(queryParams.get('type')||'all');
  const [genre, setGenre] = useState(queryParams.get('genre')||'All');
  const [author, setAuthor] = useState(queryParams.get('author')||'None');
  const [search, setSearch] = useState(queryParams.get('search')||'');
  const [question, setQuestion] = useState("");

  // State for data
  const [mangaGenres, setMangaGenres] = useState([]);
  const [novelGenres, setNovelGenres] = useState([]);
  const [listGenres, setListGenres] = useState([]);
  const [listResult, setListResult] = useState([]);
  const [listResultAdvanced, setListResultAdvanced] = useState([]);
  const [isVIP, setIsVIP] = useState(false);

  // Author list (consider moving to a separate constants file)
  const authors = [
    "h-goon (현군)", "Chugong (추공)", "Gi So-Ryeong (기소령)", "Fukuda Shinichi", "Sakano Anri", "Aizawa Daisuke", "Fuse", "Takahiro", "Yamada Kanehito", "Kentaro Miura",
    "Mori Kouji", "Fujimoto Tatsuki", "Oda Tomohito", "Rifujin na Magonote", "ONE", "774 (Nanashi)", "Mishima Yomu", "Sogano Shachi", "Kinojo Miya", "Baba Okina",
    "Azumi Kei", "Izumi Tomoki", "Ononata Manimani", "Tanabata Satori", "Nagaoka Taichi", "Akutami Gege", "Hyuuga Natsu", "Nanao Itsuki", "Endou Tatsuya", "Nishi Osamu",
    "Teshima Fuminori", "Hero", "sing N song (싱숑)", "UMI", "Shirakome Ryo", "Oda Eiichiro", "Miku (美紅)", "Akasaka Aka", "Sakurai Norio", "Tsukiyo Rui",
    "Harawata Saizou", "Mikami Saka", "Kui Ryoko", "Kazuno Fefu", "Myon", "Ishino Yassan", "Shinozaki Kaoru", "Sansan Sun", "Kotoyama", "Yashu",
    "Usonan (유소난)", "Oono Kousuke", "Hagiu Aki", "Kanamaru Yuki", "Goji Shoji", "Tanaka Yuu", "Ryuyu", "Kazanami Shinogi", "Kurokata", "Take",
    "Katou Yuuichi", "Eguchi Ren", "Aneko Yusagi", "Berry (열매)", "Soda Ice (뽕따맛스크류바)", "Umemura Shinya", "Fukui Takumi", "Nakamura Rikito", "Arai Sumiko", "Yuuki Karaku",
    "Miraijin A", "Densuke (デンスケ)", "Kojima Takehiro", "Yukimori Nene", "Miyajima Reiji", "Gwon Gyeoeul (권겨을)", "Okano Yuu", "Akai Matsuri", "Tatsu Yukinobu", "Kaneshiro Muneyuki",
    "Yukimura Makoto", "Hiiragi Yuuichi", "Sumimori Sai", "Kitagawa Nikita", "Yanagino Kanata", "Ryuto", "Shiraishi Arata", "Maki Keigo", "Isshiki Ichika", "Sawamura Harutarou",
    "Shinkou Shotou", "Hinoura Takumi", "Mayoi Tofu", "Isayama Hajime", "Horikoshi Kouhei", "Ononaka Akihiro", "Hakari Enki", "Hata Kenjiro", "Zappon", "Ikada Kai",
    "Tamamaru (たままる)", "Kankitsu Yusura", "Roy", "Inori.", "Yamaguchi Satoru", "Shimesaba (しめさば)", "Niichi", "Kratos5627", "ZebraUnicorn", "Draith",
    "Mahmoud Schahed", "Nolifeneeded", "l-Ryn-l", "Syphax", "zang", "The First Observer", "marshalcarper", "JimQuill", "Fabled Webs", "PeterRoberts",
    "J P Koenig", "Buller", "S.C. King", "Urmie", "SavingThrow", "Mangowo", "PlumParrot", "C.H. Mouser", "J.M. Clarke (U Juggernaut)", "Anne Crews",
    "warden1207", "C. Sebastian Nutt", "itsdirector", "UndyingRevenge", "bor902", "LibrinLatone", "CNBaihaqi", "L.S. Easton", "CPT.Nicomedes", "Capaluchu",
    "PigLord42", "jerpatch", "Vitaly S Alexius", "nugenttw", "Orthoros", "Tom Writing Quietly", "melmonella", "Kairami", "Critical Scribe", "Vincent Archer",
    "DestroyatronMk8", "ImmovableMage", "Romeru", "Silverteller", "Zach Skye", "Edontigney", "Maradina", "Adventuresse", "WolfShine", "Resigned Dilettante",
    "MrMander", "wasteawar", "Tony", "zoetewey", "nrsearcy", "irene_addler", "Alfir2", "Ayer12", "SerasStreams", "Mediocre At Best",
    "ToraAKR", "Delemhach", "Omega_93", "B for Byrja", "GCLopes", "J.Drude", "Frostbird", "DWinchester", "ahoge_bird", "Halosty",
    "Vihyungrang", "Skarabrae", "R.C. Joshua", "GMSteward", "Foxern", "DWS", "M.Tress", "Kia Leep", "Philippe", "BleedingTears",
    "Dirk Grey", "Cytotoxin", "Daoist Enigma", "Tribulation", "Taylor Colt", "DarkTechnomancer", "C. M. ANTAL", "DangerDesperado", "Path Liar", "arg3nt",
    "Aliapanacea", "Sylesth", "Extra26", "A.M. Long", "Halosty"
  ];


  // Update URL query parameters
  const updateQuery = async() => {
        const params = new URLSearchParams({
      type,
      genre,
      author,
      search,
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  
  };

  // Fetch genres from API
  const fetchGenres = async () => {
    try {
      const resManga = await api.get('/api/manga/genres')
      const resNovel = await api.get('/api/novel/genres')

      const manga = resManga.data.data || [];
      const novel = resNovel.data.data || [];

      setMangaGenres(manga);
      setNovelGenres(novel);
      setListGenres([...new Set([...manga, ...novel])]);
    } catch (error) {
      console.error("Error fetching genres:", error.message);
    }
  };

  // Handle advanced search
  const handleSearchButton = async () => {
    if (!question.trim()) {
      setListResultAdvanced([]);
      return;
    }

    try {
      const res = await api.post("/api/vipreader/advanced-search", {
        question,
      });
      setTimeout(() => {
        setListResultAdvanced(res.data), setListResult(res.data);
      }, 1000);
      resetFilters();
    } catch (error) {
      console.error("Advanced search error:", error);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setType("all");
    setGenre("All");
    setAuthor("None");
  };

  // Main data fetching effect
 const fetchData = async () => {
    try {
      let results = [];

      // Initial data fetch
      if (search=='' && question=='') {
        const [mangaRes, novelRes] = await Promise.all([
          api.get("/api/manga"),
          api.get("/api/novel"),
        ]);
        results = [...mangaRes.data.data, ...novelRes.data.data];
      }

      // Search by term
      if (search!='') {
     
           const res = await api.get(`/api/search/${search}`);
        results = res.data.data;
      }

      if (question!='') {
        results = listResultAdvanced;
      }

      // Apply filters
      if (type !== "all") {
        results = results.filter((item) => item.type === type);
      }

      if (genre !== "All") {
        results = results.filter((item) => item.tags.includes(genre));
      }

      if (author !== "None") {
        results = results.filter((item) => item.author.includes(author));
      }

      setListResult(results);
    } catch (error) {
      console.error("Data fetch error:", error);
    }
  };

  // Handle upgrade vip
  const handleUpgradeVip = () => {
    apiAuth.post('/api/reader/payment/create-payment-link').then(res => {
      window.location.href = res.data.url;
    })
  }

  // Effects
  useEffect(() => {
    fetchGenres();
    fetchData()
    
  }, []);

  useEffect(()=>{
    setSearch(queryParams.get('search')||'')
  },[queryParams.get('search')])

  useEffect(() => {
     

    updateQuery();
    fetchData()

  }, [type, genre, author, question, search]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <div className={styles.radioGroup}>
              <p className={styles.radioLabel}>Type:</p>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  value={"all"}
                  name="type"
                  checked={type == "all"}
                  onChange={(e) => {
                    setType(e.target.value);
                    setListGenres([...mangaGenres, ...novelGenres]);
                    setGenre("All");
                  }}
                />
                <p>All</p>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  value={"manga"}
                  name="type"
                  checked={type == "manga"}
                  onChange={(e) => {
                    setType(e.target.value), setListGenres(mangaGenres);
                    setGenre("All");
                  }}
                />
                <p>Manga</p>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  value={"novel"}
                  name="type"
                  onChange={(e) => {
                    setType(e.target.value), setListGenres(novelGenres);
                    setGenre("All");
                  }}
                  checked={type == "novel"}
                />
                <p>Novel</p>
              </div>
            </div>

            <div className={styles.selectGroup}>
              <p className={styles.selectLabel}>Genres: </p>
              <select
                className={styles.select}
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option key={-1} value={"All"}>
                  All
                </option>
                {listGenres.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.selectGroup}>
              <p className={styles.selectLabel}>Author: </p>
              <select
                className={styles.select}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              >
                <option key={-1} value={"None"}>
                  None
                </option>
                {authors.map((item, index) => (
                  <option key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Check if user is VIP */}
          {!user ? (
            <>
              <div className={styles.vipSection}>
                <div>
                  <p>You need to login to search stories from memory...</p>
                  <div
                    className={styles.vipButton}
                    onClick={() => navigate('/login')}
                  >
                    <p className={styles.vipButtonText}>Login</p>
                  </div>
                </div>
              </div>
            </>
          ) : user.role === 'VIP reader' ? (
            <>
              <div className={styles.vipSection}>
                <p className={styles.synopsisLabel}>Synopsis:</p>
                <div className={styles.textareaContainer}>
                  <textarea
                    className={styles.textarea}
                    placeholder="Enter what you remember about the story..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className={styles.searchButton} onClick={handleSearchButton}>
                <p className={styles.searchButtonText}>Search</p>
              </div>
            </>
          ) : (
            <>
              <div className={styles.vipSection}>
                <div className="flex flex-row gap-4">
                  <div>
                    <p>Become VIP to search stories from memory...</p>
                    <div
                      className={styles.vipButton}
                      onClick={handleUpgradeVip}
                    >
                      <p className={styles.vipButtonText}>Upgrade VIP</p>
                    </div>
                  </div>

                  {/* VIP benefits */}
                  <div className="bg-gray-100 rounded-xl p-3">
                    <div className="font-bold text-lg">What you get as a VIP (aka the cool kids club):</div>
                    <div>🕵️ Be the first to read our latest chapter drops — hot and fresh, straight to your eyeballs.</div>
                    <div>🔍 Use our insanely ultimate powerful blazing-fast slashy search (You type nonsense craps, we dig up gold.)</div>
                    <div>🎨 Customize your own theme or pick from a bunch of sexy presets — your vibe, your rules.</div>
                    <div>📖 Let us read chapters for you while you lie down like the majestic lazy legend you are (coming soon, we pinky swear).</div>
                    <div>🗣️ Voice cloning: Make your voice clone read stuff for you — it’s like audiobook, but with your own glorious voice (yup, also coming soon).</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setSearch(""),
              setAuthor("None"),
              setGenre("All"),
              setType("all"),
              setQuestion("");
          }}
        >
          <TbReload size={30} />
        </div>
      </div>
      {listResult.length !== 0 ? (
        listResult.map((result, index) => (
          <div className="flex md:flex-row flex-col p-5 border-b" key={index}>
            <div className="flex-1">
              <img
                src={result.bookImg?.url}
                alt=""
                className="w-30 m-auto"
                loading="lazy"
              />
            </div>
            <div className="flex-4">
              <p
                onClick={() => navigate(`/${result.type}/${result._id}`)}
                className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
              >
                {result.title}
              </p>
              <div className="flex">
                {/* <div className="flex flex-col flex-2"> */}
                <div className={styles.tagsMobile}>
                  {result.tags?.map((tag, index) => (
                    <span key={index} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex-2">
                  <p className="text-right">
                    <span className="font-[1000]">{result.followers} </span>
                    <b>FOLLOWERS</b>
                  </p>
                  <p className="text-right">
                    <span className="font-[1000]">{result.views} </span>
                    <b>VIEWS</b>
                  </p>
                  <p className="text-right">
                    <b>RATE:</b>
                    <span className="font-[1000]"> {result.rate.toFixed(2)}</span>
                  </p>
                  <p className="text-right">
                    <b></b>
                    <span className="font-[1000]">
                      {" "}
                      {result.type?.toUpperCase()}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex md:flex-row flex-col p-5 border-b">
          <div className="flex-1">
            <div className="w-30 m-auto"></div>
          </div>
          <div className="flex-4">
            <p className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer">
              Nothing to show
            </p>
            <div className="flex">
              <div className="flex flex-col flex-2"></div>
              <div className="flex-2"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdvancedSearch;
