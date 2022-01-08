import React, { useState } from 'react';
import { NewsList } from './NewsList';
import { makeNews, makeNewsItem } from "../data";
import { NewsForm } from './NewsForm';
import { NewsFilters } from './NewsFilters'


export function NewsPage() {
  const [news, setNews] = useState(makeNews());
  const [isEditing, setIsEditing] = useState(false);
  const [authorsFilter, setAuthorsFilter] = useState('');
  const [hashTagsFilter, setHashTagsFilter] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  
  function authorsFilterHandler(authorName){
    setAuthorsFilter(authorName)
  }
  
  function hashTagsFilterHandler(category){
    let indexOfCategory = hashTagsFilter.indexOf(category)
    if(indexOfCategory === -1){
        setHashTagsFilter(hashTagsFilter.concat(category));
      }else{
        setHashTagsFilter(hashTagsFilter.splice(indexOfCategory + 1, 1));
      }
  }

  function textHandler(text){
    setTextFilter(text)
  }

  return (
    <div>
      <button onClick = {() => setNews([makeNewsItem(), ...news])}>Add a random news</button>
      <button onClick = {() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Add a NewsItem'}
      </button>
      {isEditing && (
        <NewsForm
          onAddNewsItem = {(e) => setNews([e.news, ...news])}
        />
      )}
      <NewsFilters 
        authorsHandler = {(authorName)=>authorsFilterHandler(authorName)}
        hashTagsHandler = {(hashTags)=>hashTagsFilterHandler(hashTags)}
        textHandler = {(text)=>textHandler(text)}
      />
      <NewsList
        news = {[...news]}
        onRemoveNewsItem = {(id)=>setNews(news.filter((e) => e.id !== id))}
        authorsFilter = {authorsFilter}
        hashTagsFilter = {hashTagsFilter}
        textFilter = {textFilter}
      />
    </div>
  )
}
