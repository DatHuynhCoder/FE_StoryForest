import React, { useEffect, useState } from 'react'
import styles from '../SearchResult/Result.module.css'
import { useParams } from 'react-router';
import { api } from '../../services/api'

function Result() {
  const [results, setResults] = useState([]);
  const {synopsis} = useParams()
  const fetchResults = () => {
    api.post(`/api/vipreader/advanced-search`, {
      question: synopsis,
    })
    .then((res) => {
      console.log(res); // Kiểm tra dữ liệu trả về từ API
  
  
      const updatedResults = res.data.map(item => ({
        title: item.title,
        genres: item.tags,
        description: item.synopsis,  

        thumnail: item.cover_url, 

      }));
  
    
      setResults(updatedResults);
    })
    .catch((err) => {
      console.error("Failed to fetch mangas:", err);
    });
  };
  const testResults = [{ 
    title:'Solo Leveling', 
    genre:['Hành động','Phép thuật'], 
    description:'10 năm trước, sau khi “Cánh cổng” nối thế giới thực với thế giới quái vật được mở ra, một số người bình thường đã nhận được sức mạnh để săn quái vật trong Cổng...',
    thumnail: 'https://mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg'
  }];

  useEffect(()=>{
    fetchResults()
  },[synopsis])
  return (
    <div>
        {results.map((item) => (
              <div className={styles.container_item}>
                <img src={item.thumnail} alt="thumbnail" className={styles.thumbnail} />
                <div className={styles.container_content_item}>
                  <p><b>{item.title}</b></p>
                  <p><b>Tags: </b>{item.genres.join(', ')}</p>
                  <p className={styles.description_item}><b>Synopsis:  </b>{item.description}</p>
                </div>
              </div>
            ))}
    </div>
  )
}

export default Result
