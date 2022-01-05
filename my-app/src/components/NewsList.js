import React from 'react';
import PropTypes from 'prop-types';
import { NewsItem } from "./NewsItem";

export function NewsList(props) {
  const { news, onRemoveNewsItem } = props;
  return (
          <div>
            {news.map(el => (
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