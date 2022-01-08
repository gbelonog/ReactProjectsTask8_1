import React, { createRef, useEffect }from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import './newsItem.css';

export function NewsItem(props){
  const newsCardEl = createRef();
  const { newsItem, onRemoveNewsItem } = props;

  useEffect(() => {
    let newsCard = newsCardEl.current;
    gsap.fromTo(newsCard, {
      opacity: 0,   
    }, {
      opacity: 1,
      duration: 3,
    });
  });

  return (
    <div className = "NewsItem" ref = {newsCardEl}>
      <h1>{newsItem.title}</h1>
      <div><img 
        style = {{
          width: '300px',
          height: '200px',
          objectFit: 'cover',
        }} 
        src = {newsItem.photo} 
        alt = {newsItem.title}
      /></div>
      Short Description:
      <div dangerouslySetInnerHTML = {{ __html: newsItem.shortDescription }} />
      Text:
      <div dangerouslySetInnerHTML = {{ __html: newsItem.text }} />
      <div><b>HashTags: </b>{newsItem.hashTags? newsItem.hashTags.join(', '):newsItem.hashTags }</div>
      <div><b>Author: </b>{newsItem.author}</div>
      <div><button onClick = {() => onRemoveNewsItem(newsItem.id)}>Delete</button></div>
    </div>
  );
}

NewsItem.propTypes = {
  newsItem: PropTypes.object.isRequired,
  onRemoveNewsItem: PropTypes.func.isRequired,
};

NewsItem.defaultProps = {
  newsItem: {}
};