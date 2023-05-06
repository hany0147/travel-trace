import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Form, Carousel } from 'react-bootstrap';
import { Bookmark, Heart } from 'react-bootstrap-icons';

function Detail() {
  const [article, setArticle] = useState(null);

  const { id } = useParams(); // 디테일이랑 all 연결
  
  const [commentCount, setCommentCount] = useState(0); // 댓글 개수 상태 변수
  const [comments, setComments] = useState([]);

  // 작성일(년월일)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/articles/${id}/'); // 디테일과 all 연결을 위한 url파라미터
        console.log(id)
        setArticle(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/articles/1/`);
        setCommentCount(response.data.comment_count);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/articles/1/comments`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();
    fetchCommentCount();
    fetchComments();
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
            
          {article.username} {formatDate(article.created_at)}
            
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
            <p className='m-3'>
              {article.content.split(' ').map((word, index) => {
                if (word.startsWith('#')) {
                  const tag = word.substring(1);
                  return (
                    <React.Fragment key={index}>
                      {' '}
                      <a href={`/tags/${tag}`}>{`#${tag}`}</a>{' '}
                    </React.Fragment>
                  );
                } else {
                  return <span key={index}>{word} </span>;
                }
              })}
            </p>
          </div>
        <div className="mt-4">
        <hr className="my-4" />
        <div className="d-flex justify-content-between align-items-center mb-2">
          <p>댓글 개수: {commentCount}</p>
        </div>
        <div className="mb-3 d-flex justify-content-center align-items-center" style={{ marginBottom: '10px' }}>
          <input type="text" className="form-control flex-grow-1" placeholder="댓글 입력" style={{ height: 'auto', minWidth: '70%', maxWidth: '90%' }} />
          <button className="btn btn-success ms-2" style={{ backgroundColor: '#A0D468', border: 'none' }}>등록</button>
        </div>
        <hr className="my-4" />
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="d-flex mb-3">
              <p className="ms-3">{comment.user}</p>
              <p className="ms-auto me-3">{formatDate(comment.created_at)}</p>
            </div>
            <div className="d-flex align-items-center">
              <p>{comment.content}</p>
              <button className="btn btn-success ms-auto" style={{ backgroundColor: '#A0D468', border: 'none' }}>댓글 좋아요</button>
            </div>
            <hr className="my-4" />
          </div>
        ))}
      </div>
      </div>
  
    </Container>
  );
}

export default Detail;