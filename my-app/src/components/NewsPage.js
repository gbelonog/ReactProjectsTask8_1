import React, { useState, useEffect } from 'react';
import { NewsList } from './NewsList';
import { makeNews, makeNewsItem } from "../data";
import { NewsForm } from './NewsForm';
import { NewsFilters } from './NewsFilters'


export function NewsPage() {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [authorsFilter, setAuthorsFilter] = useState('');
  const [hashTagsFilter, setHashTagsFilter] = useState([]);
  const [textFilter, setTextFilter] = useState('');

  function authorsFilterHandler(authorName){
    setAuthorsFilter(authorName)
  }
  
  function hashTagsFilterHandler(hashTags){
    console.log('hashTags.label in page', hashTags.label);
    let index = 0;

    if (hashTagsFilter.length === 0){setHashTagsFilter([hashTags.label])}
    else{
      index = hashTagsFilter.indexOf(hashTags.label);
      //console.log('index', index);
      if(index === -1){
          //console.log('need to push');
          setHashTagsFilter([...hashTagsFilter, hashTags.label])
        } else {
          //console.log('need to slice',);
          let filtered = hashTagsFilter;
          filtered.splice(index, 1) ;
          //console.log('filtered', filtered);
          setHashTagsFilter(filtered);
          }
    }
    console.log('hashTagsFilter in page', hashTagsFilter);
  }

  function textHandler(text){
    setTextFilter(text)
  }

  return (
    <div>
      <button onClick={() => setNews([...news, makeNewsItem()])}>Add a random news</button>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Add a NewsItem'}
      </button>
        {isEditing && (
          <NewsForm
            onAddNewsItem={(e) => setNews([e.news, ...news])}
          />
        )}
          <NewsFilters 
            // news = {news}
            authorsHandler = {(authorName)=>authorsFilterHandler(authorName)}
            hashTagsHandler = {(hashTags)=>hashTagsFilterHandler(hashTags)}
            textHandler = {(text)=>textHandler(text)}
      />

      <NewsList
          news={[...news]}
          onRemoveNewsItem={(id)=>setNews(news.filter((e) => e.id !== id))}
          authorsFilter = {authorsFilter}
          hashTagsFilter = {hashTagsFilter}
          textFilter = {textFilter}
      />
    </div>
  )
}
