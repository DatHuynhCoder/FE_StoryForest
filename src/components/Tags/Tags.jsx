import React, { useEffect, useState } from "react";
import styles from '../AdvancedSearch/AdvancedSearch.module.css'
import { api } from '../../services/api'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";

function Tags({type, setToggle, toggle}) {
    // Các thể loại Manga dùng để lọc
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

    const [genres, setGenres] = useState(mangaGenres); // Danh sách thể loại hiện tại

    const [genre, setGenre] = useState('');
  useEffect(()=>{
    if(type == 'manga'){
      setGenre('');
      setGenres(mangaGenres); // Gán lại thể loại là manga
    }
    else{
      setGenre('');
      setGenres(novelGenres); // Gán lại thể loại là novel
    }
  }, [type])
  return (
      <>
          <div className={styles.container}>
            {/* Vùng chứa menu chọn loại tìm kiếm */}
            <div style={{justifyItems:'flex-end', marginRight:10}}>
              {toggle ? (  <FaCaretUp size={30} color="white" onClick={() => setToggle(!toggle) }/>) :(  <FaCaretDown size={30} color="white" onClick={() => setToggle(!toggle) }/>)}
            

              </div>
              
            </div>
    
            {/* Vùng nội dung chính */}
            <div className={styles.container_content} style={{display: toggle ? 'block' : 'none'}}>
                  <ul className={styles.container_types}>
                    {genres.map((item, index) => (
                      <li key={item + index}>
                        <input
                          className={[styles.item_type, genre == item ? styles.selected_genre : ''].join(' ')}
                          type="button"
                          value={item}
                          onClick={() => setGenre(item)}
                        />
                      </li>
                    ))}
                  </ul>
            </div>
      
      
        </>
  )
}

export default Tags
