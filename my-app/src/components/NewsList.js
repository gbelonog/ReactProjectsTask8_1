import React from 'react';
import PropTypes from 'prop-types';
import { NewsItem } from "./NewsItem";

export function NewsList(props) {
  const { news, onRemoveNewsItem, authorsFilter, hashTagsFilter, textFilter } = props;
  // console.log('authorsFilter in list', authorsFilter);
  // console.log('row news', news);
  let filteredNews = [];


  
  

  
  
  if (authorsFilter === ''){
    filteredNews = news;
  }else{
  filteredNews = news.filter(e => {
    if (e.author === authorsFilter) return e
  })
  }

  console.log('hashTagsFilter in list', hashTagsFilter);
  let flag = false;

  if(hashTagsFilter.length > 0){
    filteredNews = filteredNews.filter(e => {
      console.log(' e.hashTags in filteredNews', e.hashTags);
      hashTagsFilter.map(el => {
        for(let i = 0; i < e.hashTags.length; i++){
            if(el === e.hashTags[i]){flag = true}
        }
      })
      if(flag)return e;
      console.log('flag', flag);    
    })
  }
  console.log('textFilter',textFilter);
  console.log('news[0].title in list', news[0]);
  console.log('titles', news.map((e, i) => {console.log(i, ' -', e.title)}))
  if(textFilter){
    filteredNews = filteredNews.filter(e => {
      const searchInShortDescription = (e.shortDescription).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchText = (e.text).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchInTitle = (e.title).toLowerCase().indexOf(textFilter.toLowerCase())!==-1;
      const searchValue = searchInShortDescription || searchText || searchInTitle;
      //const searchValue = searchInTitle;
      console.log('searchValue',searchValue)
    if(searchValue) return e;
  })
  }
  console.log('filtered news', filteredNews);
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
  news: PropTypes.array,
  onRemoveNewsItem: PropTypes.func.isRequired,
};

NewsList.defaultProps = {
  news: [],
};