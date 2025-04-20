import React, { useState } from "react";
import styles from "../AdvancedSearch/AdvancedSearchPage.module.css";

function AdvancedSearchPage() {
  const mangaGenres = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Romance",
    "Horror",
    "Mystery",
    "Sci-Fi",
    "Slice of Life",
  
  ];
  
  const novelGenres = [
    "Action",
    "Adventure",
    "Fantasy",
    "Supernatural",
    "Isekai",
    "Reincarnation",
    "Time Travel",
    "Romance",
    "Historical Romance",
    "School Romance",
    "Psychological",
    "Drama",
    "Slice of Life",
    "Horror",
    "Mystery",
    "Thriller",
    "Science Fiction",
    "Historical",
    "Satire",
    "Western"
  ];
  
  const [genre, setGenre] = useState(mangaGenres[0])
  const [option, setOption] = useState(1);
  const [genres, setGenres] = useState(mangaGenres);
  const [isOpenedAdvancedForm, setIsOpenedAdvancedForm] = useState(false);
  const [inputCharacters, setInputCharacters] = useState('')
  const [inputMangaNovelName, setInputMangaNovelName] = useState('')
  const [inputDescription, setInputDescription] = useState('')


  const handleSelectedOption = (selectedOpt) => {
    setOption(selectedOpt);
    if (selectedOpt == 1) {
      setIsOpenedAdvancedForm(false);
      setGenres(mangaGenres);
    } else if (selectedOpt == 2) {
      setIsOpenedAdvancedForm(false);
      setGenres(novelGenres);
    } else {
      setIsOpenedAdvancedForm(true);
    }
  };

  const handleSelectedGenre = (item) =>{
    setGenre(item)
  
  }

  const handleSubmitingAdvancedForm = () => {

    alert(10)

  }

  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_options}>
          <ul className={styles.options}>
            <li
              className={[
                styles.option,
                option == 1 ? styles.selected : "",
              ].join(" ")}
            >
              <input
                type="button"
                value={"Manga"}
                onClick={() => handleSelectedOption(1)}
              />
            </li>
            <li
              className={[
                styles.option,
                option == 2 ? styles.selected : "",
              ].join(" ")}
            >
              <input
                type="button"
                value={"Novel"}
                onClick={() => handleSelectedOption(2)}
              />
            </li>
            <li
              className={[
                styles.option,
                option == 3 ? styles.selected : "",
              ].join(" ")}
            >
              <input
                type="button"
                value={"Tìm kiếm nâng cao"}
                onClick={() => handleSelectedOption(3)}
              />
            </li>
          </ul>
        </div>
        <div className={styles.container_content}>
          <>
            {isOpenedAdvancedForm ? (
              <>
              <form className={styles.advanced_form} action={handleSubmitingAdvancedForm}>
                
                <label for='characterNames' className={styles.label}>Tên nhân vật:</label> <input type="text" id="characterNames" name="characterNames" className={styles.input} value={inputCharacters} onChange={(e) => setInputCharacters(e.target.value)}/>
                <label for='mangaNovelName'className={styles.label}>Tên truyện:</label> <input type="text" id="mangaNovelName" name="mangaNovelName" className={styles.input} value={inputMangaNovelName} onChange={(e) => setInputMangaNovelName(e.target.value)}/>
                <label for='mangaNovelDescription' className={styles.label}>Nội dung:</label> <textarea id="mangaNovelDescription" name="mangaNovelDescription" className={styles.description} value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}></textarea>
                <div className={styles.container_submit}><button className={styles.submit} type="submit" >Tìm kiếm</button></div>
                </form></>
            ) : (
              <>
                <ul className={styles.container_types}>
                  {genres.map((item) => (
                    <li >
                      <input className={[styles.item_type, genre == item ? styles.selected_genre : ''].join(' ')} type="button" value={item} onClick={() => handleSelectedGenre(item)} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        </div>
      </div>
    </>
  );
}

export default AdvancedSearchPage;
