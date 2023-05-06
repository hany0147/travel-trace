import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Form, Carousel } from 'react-bootstrap';
import { Bookmark, Heart } from 'react-bootstrap-icons';

function Detail() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/1/');
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
  }, []);

  if (!article) {
    return <div>Loading...</div>; // 로딩 상태 표시
  }

  return (
    <Container className="mt-5">
      <div className="border p-4">
        <div className='d-flex justify-content-between align-items-center'>
          <h3>{article.title}</h3>
          <p className="me-3">{article.location}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            
          {article.username} {article.createdDate}
            
          </div>
          <div>
            <div className='d-flex'>
              <div className='me-2'><Heart fill='grey' /></div>
              <div><Bookmark fill='grey'/></div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <Form>
          {/* Form 내용을 추가하거나 수정할 수 있습니다 */}
        </Form>
        <div className="mt-4">
          <Container style={{ maxWidth: '600px' }}>
            <Carousel>
              {article.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 mx-auto"
                    src={`http://127.0.0.1:8000${image.image}`}
                    alt={`이미지 ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

           </Container>
        </div>
        <div>
          <p>
            {article.content}
          </p>
        </div>
        <div className="mt-4">
          <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center mb-2">
            <p>댓글 개수</p>
          </div>
          <div className="mb-3 d-flex justify-content-center align-items-center" style={{ marginBottom: '10px' }}>
            <input type="text" className="form-control flex-grow-1" placeholder="댓글 입력" style={{ height: 'auto', minWidth: '70%', maxWidth: '90%'}} />
            <button className="btn btn-success ms-2" style={{ backgroundColor: '#A0D468', border: 'none' }}>등록</button>
          </div>
          <hr className="my-4" />
          <div className="d-flex mb-3">
            <p className="ms-3">댓글 작성자</p>
            <p className="ms-auto me-3">작성일자</p>
          </div>
          <div className="d-flex align-items-center">
            <p>댓글 내용</p>
            <button className="btn btn-success ms-auto" style={{ backgroundColor: '#A0D468', border: 'none' }}>댓글 좋아요</button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Detail;