import React from 'react';
import PropTypes from 'prop-types';
import { HASHTAGS, AUTHORS } from "../data";

export function NewsFilters (props){ 
  const { authorsHandler, hashTagsHandler, textHandler } = props;

  return(
    <div className="Filters">
    <p></p>Filters
    <label className="Filter"> {
      <div>Authors:
        {AUTHORS.map((e, i) => 
          <label key = {'author' + i}>
            <input 
              type = "radio" 
              name = 'author' 
              onChange = {() => authorsHandler(e)} 
              ></input>
            {e}
          </label>)
        }
        <input
          type="radio" 
          name='author'
          defaultChecked
          onChange = {() => authorsHandler('')}
        ></input>
        Default

        <div>Hashtags: 
          {HASHTAGS.map((e, i) => 
            <label key = {'hashTag' + i}>
              <input 
                type="checkbox" 
                name='hashTag' 
                onChange = {() => hashTagsHandler(e)} 
              ></input>
              {e.value}
            </label>)
          }
        </div>
      </div>
    }
    </label>
    <label className="Filter">
      Search text: 
      <input type="text" onChange={event =>{textHandler(event.target.value)}} ></input>
    </label>
    <p></p>
  </div>
  );
}

NewsFilters.propTypes = {
  authorsHandler: PropTypes.func.isRequired,
  hashTagsHandler: PropTypes.func.isRequired, 
  textHandler: PropTypes.func.isRequired,
}

NewsFilters.defaultProps = {};