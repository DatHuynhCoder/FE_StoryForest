import React, { useEffect, useState } from "react";
import styles from '../Tags/Tags.module.css'
import { api } from '../../services/api'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router";

function Tags({type, setToggle, toggle}) {
    // Các thể loại Manga dùng để lọc
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]); // Danh sách thể loại hiện tại
   const fetchGenres = async () => {
    if (!type) return console.warn("Type is not defined");

    try {
      const res = await api.get(`/api/${type}/genres`);
      setGenres(res.data.data)
    } catch (error) {
      console.error("Error fetching genres:", error.message);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, [type]);

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
                          className={styles.item_type}
                          type="button"
                          value={item}
                          onClick={() => { navigate(`/advanced-search?type=${type}&genre=${item}&author=None`)}}
                        />
                      </li>
                    ))}
                  </ul>
            </div>
      
      
        </>
  )
}

export default Tags
