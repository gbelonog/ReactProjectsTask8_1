import React from 'react';
import PropTypes from 'prop-types';
import { NewsItem } from "./NewsItem";

export function NewsList(props) {
  const { news, onRemoveNewsItem, authorsFilter, hashTagsFilter, textFilter } = props;
  let filteredNews = [];
  
  if (authorsFilter === ''){
    filteredNews = news;
  }else{
    filteredNews = news.filter(e => {
      if (e.author === authorsFilter) return e
    })
  }

  if(hashTagsFilter.length > 0){
    filteredNews = filteredNews.filter(e => {
      let result = 0;
      hashTagsFilter.map(el => {
        result= result +(e.hashTags.indexOf(el.label) !== -1)
      });
      if(!!result) return e;
    })
  }
  
  if(textFilter){
    filteredNews = filteredNews.filter(e => {
      const searchInShortDescription = (e.shortDescription).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchText = (e.text).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchInTitle = (e.title).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchValue = searchInShortDescription || searchText || searchInTitle;
      if(searchValue) return e;
    })
  }

  return (
    <div>
      {filteredNews.map(el => (
        <div key={el.id} >
          <NewsItem
            onRemoveNewsItem={onRemoveNewsItem}
            newsItem={el}
          />
        </div>
      ))}
    </div>
  );
};
  
NewsList.propTypes = {
  news: PropTypes.array.isRequired,
  onRemoveNewsItem: PropTypes.func.isRequired,
  authorsFilter: PropTypes.string.isRequired, 
  hashTagsFilter: PropTypes.array.isRequired, 
  textFilter: PropTypes.string.isRequired
};

NewsList.defaultProps = {
  news: []
};