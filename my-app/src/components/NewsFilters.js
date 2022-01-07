import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import './NewsFilters.css'
import { HASHTAGS, AUTHORS } from "../data";
//import news from '../../news.json';

export function NewsFilters (props){ 
    const { authorsHandler, hashTagsHandler, textHandler } = props;

    return(
      <div className="Filters">
      <p></p>Filters
       <label className="Filter" > {
         <div>Authors:
          { AUTHORS.map(e => 
            <label>
              <input 
                type="radio" 
                name='author'  
                onChange = {() => authorsHandler(e)} 
                ></input>
              {e}
            </label>)
          }
          <input
            type="radio" 
            name='author'
            defaultChecked
            onChange = {() => { console.log('default');
              authorsHandler('') }}
            ></input> 
            Default
          <div>Hashtags: 
            { HASHTAGS.map(e => 
              <label>
                <input 
                  type="checkbox" 
                  name='author'  
                  onClick = {() => { console.log('e', e);
                    hashTagsHandler(e) }} 
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
  specialFilterHandler: PropTypes.func.isRequired,
  linkPresenceHandler: PropTypes.func.isRequired, 
  photoPresenceHandler: PropTypes.func.isRequired,
  searchTextHandler: PropTypes.func.isRequired,
  categoriesListHandler: PropTypes.func.isRequired,
}

NewsFilters.defaultProps = {
  specialFilterHandler: ()=>{},
  linkPresenceHandler: ()=>{}, 
  photoPresenceHandler: ()=>{},
  searchTextHandler: ()=>{},
  categoriesListHandler: ()=>{},
};

//export { NewsFilters };