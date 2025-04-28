import React, { useState } from "react";
import styles from '../AdvancedSearch/AdvancedSearch.module.css'
import { api } from '../../services/api'
import { FaCaretUp } from "react-icons/fa";

function AdvancedSearch({setOpen, setToggle, toggle}) {
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
  

  // Dữ liệu mẫu để test kết quả hiển thị
  const testResults = [{ 
    title:'Solo Leveling', 
    genre:['Hành động','Phép thuật'], 
    description:'10 năm trước, sau khi “Cánh cổng” nối thế giới thực với thế giới quái vật được mở ra, một số người bình thường đã nhận được sức mạnh để săn quái vật trong Cổng...',
    thumnail: 'https://mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg'
  }];

  // Khai báo các state
  const [genre, setGenre] = useState('');
  const [option, setOption] = useState(1); // 1: Manga, 2: Novel, 3: Tìm kiếm nâng cao
  const [genres, setGenres] = useState(mangaGenres); // Danh sách thể loại hiện tại
  const [isOpenedAdvancedForm, setIsOpenedAdvancedForm] = useState(false); // Trạng thái mở form nâng cao
  const [inputDescription, setInputDescription] = useState(''); // Input mô tả

  // Xử lý chọn loại tìm kiếm (Manga, Novel, hoặc Tìm kiếm nâng cao)
  const handleSelectedOption = (selectedOpt) => {
    setOption(selectedOpt);
    if (selectedOpt == 1) {
      setIsOpenedAdvancedForm(false);
      setGenre('');
      setGenres(mangaGenres); // Gán lại thể loại là manga
    } else if (selectedOpt == 2) {
      setIsOpenedAdvancedForm(false);
      setGenre('');
      setGenres(novelGenres); // Gán lại thể loại là novel
    } else {
      setIsOpenedAdvancedForm(true); // Mở form tìm kiếm nâng cao
    }
  };

  // Xử lý chọn thể loại
  const handleSelectedGenre = (item) => {
    setGenre(item); // Gán thể loại đã chọn
  }

  // Xử lý gửi form tìm kiếm nâng cao
  const handleSubmitingAdvancedForm = async (e) => {
    e.preventDefault(); // Ngăn reload trang

    const query = `Tên nhân vật liên quan: "${inputCharacters}". Tên truyện tôi nhớ: "${inputMangaNovelName}". Mô tả của tôi: "${inputDescription}".`;

    try {
      // Gửi API tìm kiếm (đã tạm comment lại)
      // const res = await api.get(`/api/suggestion?q=${query}`);
      // console.log("Kết quả từ API:", res.data);
      // setResults(res.data); // Cập nhật danh sách kết quả
      // alert("Đã gửi yêu cầu thành công!");
    } catch (error) { 
      console.error("Lỗi khi gọi API:", error);
      alert("Đã xảy ra lỗi khi tìm kiếm.");
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* Vùng chứa menu chọn loại tìm kiếm */}
        <div className={styles.container_options}>
          <ul className={styles.options}>
            <li >
              <input className={[styles.option, option == 1 ? styles.selected : ""].join(" ")} type="button" value={"Manga"} onClick={() => handleSelectedOption(1)} />
            </li>
            <li >
              <input className={[styles.option, option == 2 ? styles.selected : ""].join(" ")} type="button" value={"Novel"} onClick={() => handleSelectedOption(2)} />
            </li>
            <li >
              <input className={[styles.option, option == 3 ? styles.selected : ""].join(" ")} type="button" value={"Tìm kiếm nâng cao"} onClick={() => handleSelectedOption(3)} />
            </li>
          </ul>
          <FaCaretUp size={30} color="white" onClick={() => setOpen(false)}/>
        </div>

        {/* Vùng nội dung chính */}
        <div className={styles.container_content}>
          {
            isOpenedAdvancedForm ? (
              // Hiển thị form tìm kiếm nâng cao
              <form className={styles.advanced_form} onSubmit={handleSubmitingAdvancedForm}>
              
                
                <label htmlFor='mangaNovelDescription' className={styles.label}>Nội dung:</label>
                <textarea id="mangaNovelDescription" name="mangaNovelDescription" className={styles.description} value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}></textarea>
                
                <div className={styles.container_submit}>
                  <button className={styles.submit} type="submit">Tìm kiếm</button>
                </div>
              </form>
            ) : (
              // Hiển thị danh sách thể loại
              <ul className={styles.container_types}>
                {genres.map((item, index) => (
                  <li key={item + index}>
                    <input
                      className={[styles.item_type, genre == item ? styles.selected_genre : ''].join(' ')}
                      type="button"
                      value={item}
                      onClick={() => handleSelectedGenre(item)}
                    />
                  </li>
                ))}
              </ul>
            )
          }
        </div>
      </div>

      Kết quả tìm kiếm (hiện đang ẩn - chỉ dùng test)
      {testResults.map((item) => (
        <div className={styles.container_item}>
          <img src={item.thumnail} alt="thumbnail" className={styles.thumbnail} />
          <div className={styles.container_content_item}>
            <p><b>{item.title}</b></p>
            <p><b>Thể loại: </b>{item.genre.join(', ')}</p>
            <p className={styles.description_item}><b>Nội dung: </b>{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default AdvancedSearch;
