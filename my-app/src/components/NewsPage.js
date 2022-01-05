import React, { useState } from 'react';
import { NewsList } from './NewsList';
import { makeNews, makeNewsItem } from "../data";
import { NewsForm } from './NewsForm';

export function NewsPage() {
  const [news, setNews] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

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
      <NewsList
          news={[...news]}
          onRemoveNewsItem={(id)=>setNews(news.filter((e) => e.id !== id))}
      />
    </div>
  )
}
