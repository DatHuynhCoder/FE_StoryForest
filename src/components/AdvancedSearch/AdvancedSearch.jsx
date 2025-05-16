import React, { use, useEffect, useState } from 'react'
import styles from '../AdvancedSearch/AdvancedSearch.module.css'
import { api } from '../../services/api';
import { useNavigate, useLocation } from 'react-router-dom';


function AdvancedSearch() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
   const typeParam = queryParams.get('type');
   const genreParam = queryParams.get('genre');
   const authorParam = queryParams.get('author');
    const updateQuery = () => {
    const params = new URLSearchParams(location.search);
    params.set('type', type ? type : 'all'); 
     params.set('genre', genre ? genre : 'All'); 
      params.set('author', author ? author : 'None'); 
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };
 
      const mangaGenres = [
      "GameLit", "Portal Fantasy / Isekai", "Anti-Hero Lead", "War and Military", "Grimdark", "Action",
      "Adventure", "Fantasy", "Sci-fi", "Artificial Intelligence", "Attractive Lead", "Cyberpunk",
      "Dystopia", "Hard Sci-fi", "Low Fantasy", "Magic", "Male Lead", "Reincarnation",
      "Supernatural", "Slice of Life", "Drama", "Gender Bender", "LitRPG", "Psychological",
      "Female Lead", "High Fantasy", "Urban Fantasy", "Super Heroes", "Comedy", "Soft Sci-fi",
      "Progression", "Non-Human Lead", "Strong Lead", "Xianxia", "School Life", "Multiple Lead Characters",
      "Ruling Class", "Steampunk", "Romance", "Time Travel", "Dungeon", "Horror",
      "Martial Arts", "Contemporary", "Secret Identity", "Wuxia", "Harem", "Historical",
      "Post Apocalyptic", "Tragedy", "First Contact", "Strategy", "Genetically Engineered", "Mystery",
      "Space Opera", "Mythos", "Villainous Lead", "Satire", "Technologically Engineered"
    ];
    
    // Các thể loại Novel dùng để lọc
    const novelGenres = [
      "Award Winning", "Monsters", "Action", "Long Strip", "Adventure", "Magic", "Drama",
      "Fantasy", "Web Comic", "Supernatural", "Adaptation", "Full Color", "Romance",
      "Comedy", "School Life", "Slice of Life", "Gyaru", "Reincarnation", "Demons",
      "Martial Arts", "Harem", "Isekai", "Samurai", "Sci-Fi", "Military",
      "Monster Girls", "Psychological", "Sexual Violence", "Philosophical", "Gore", "Horror",
      "Tragedy", "Superhero", "Mystery", "Mecha", "Video Games", "Villainess",
      "Delinquents", "Survival", "Ghosts", "Thriller", "Historical", "Medical",
      "Animals", "Police", "Crossdressing", "Post-Apocalyptic", "Crime", "Time Travel",
      "Loli", "Genderswap", "Ninja", "Cooking", "Vampires", "Mafia",
      "Girls' Love", "Music", "Zombies", "Shota", "Reverse Harem", "Aliens",
      "Sports", "Magical Girls", "Office Workers", "Doujinshi"
    ];

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
  "Aliapanacea", "Sylesth", "Extra26", "A.M. Long"
];
  const [type, setType] = useState('all')
  const [listGenres, setListGenres] = useState([...mangaGenres, ...novelGenres])
  const [isVIP, setIsVIP] = useState(false);
  const [genre, setGenre] = useState('All');
  const [author, setAuthor] = useState('None')
  const [question, setQuestion]=useState('')

const [listResult, setListResult] = useState([])

  const handleSearchButton = async() =>{

    try {
      const res = await api.post('/api/vipreader/advanced-search',{question: question})
      console.log(res)
      
      setTimeout(()=>{
             setListResult(res.data) 
      }, 1000)
      setType('all');
    setGenre('All')
   setAuthor('None')
   


    } catch (error) {
      
    }
    
  }
  // Các thể loại Manga dùng để lọc

  useEffect(()=>{
    setType(typeParam ? typeParam : 'all');
    setGenre(genreParam ? genreParam :'All')
    setAuthor(authorParam ? authorParam :'None')
    
  },[])


   useEffect(() => {
     const fetchData = async () => {
       try {
         const mangaRes = await api.get("/api/manga");
         const novelRes = await api.get("/api/novel");
 
         const combinedResults = [...mangaRes.data.data, ...novelRes.data.data];
         let results = combinedResults;
 
         if (type!= "all") {
           results = results.filter((item) => item.type == type);
         }

         if(genre != 'All'){
           results = results.filter((item) => item.tags.includes(genre));
         } 

        if(author != 'None'){
           results = results.filter((item) => item.author.includes(author));
         } 
         
         console.log(results);
         setListResult(results);
       } catch (error) {
         console.error(error);
       }
     };
     
     fetchData();
     updateQuery()
   }, [type, genre, author]);
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
                  setType(e.target.value), setListGenres(mangaGenres);
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
              <option key={-1} value={'All'}>All</option>
              {listGenres.map((item, index) => (
                <option key={index} value={item}>{item}</option>
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
              <option key={-1} value={'None'}>None</option>
              {authors.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        {isVIP ? (
          <>
          <div className={styles.vipSection}>
            <p className={styles.synopsisLabel}>Synopsis:</p>
            <div className={styles.textareaContainer}>
              <textarea
                className={styles.textarea}
                placeholder="Enter what you remember about the story..."
                value={question}
                onChange={(e)=>setQuestion(e.target.value)}
              ></textarea>
            </div>
               
          </div>
          <div
        className={styles.searchButton}
        onClick={handleSearchButton}
      >
        <p className={styles.searchButtonText}>Search</p>
      </div></>
        ) : (
          <>
          <div className={styles.vipSection}>
            <div>
              <p>Become VIP to search stories from memory...</p>
              <div
                className={styles.vipButton}
                onClick={() => setIsVIP(true)}
              >
                <p className={styles.vipButtonText}>To VIP</p>
              </div>
            </div>
            
          </div>
       
      </>
        )}
           
        
      </div>
      
   
    </div>
    {listResult.length !== 0 ? (
                        listResult.map((result, index) => (
                          <div
                            className="flex md:flex-row flex-col p-5 border-b"
                            key={index}
                          >
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
                                onClick={() =>
                                  navigate(`/${result.type}/${result._id}`)
                                }
                                className="text-lg md:text-xl font-bold text-green-500 text-center hover:underline cursor-pointer"
                              >
                                {result.title}
                              </p>
                              <div className="flex">
                                {/* <div className="flex flex-col flex-2"> */}
                                  <div style={{ height:'fit-content', width:'30%', display:'flex', flexWrap:'wrap', flexDirection: 'row', rowGap:'10px'}}>
                                  
                                  {result.tags?.map((tag, index) => (
                                    
                                      <span className="border rounded-md text-xs md:text-[10px] font-black p-1" style={{height:'fit-content', margin:'5px'}}>
                                        {tag}
                                      </span>
                                    
                                  ))}
                                </div>
                                <div className="flex-2">
                                  <p className="text-right">
                                    <span className="font-[1000]">
                                      {result.followers}{" "}
                                    </span>
                                    <b>FOLLOWERS</b>
                                  </p>
                                  <p className="text-right">
                                    <span className="font-[1000]">
                                      {result.views}{" "}
                                    </span>
                                    <b>VIEWS</b>
                                  </p>
                                  <p className="text-right">
                                    <b>RATE:</b>
                                    <span className="font-[1000]">
                                      {" "}
                                      {result.rate}
                                    </span>
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

export default AdvancedSearch