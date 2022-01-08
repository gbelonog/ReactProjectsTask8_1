import React, { useState } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import { HASHTAGS, AUTHORS } from "../data";

const ERRORS = {
  title: "Title cannot be empty.",
  text: "Text cannot be empty.",
  photo: "Photo is not selected.",
  hashTags: "Hash tags are not selected.",
  author: "Author is not selected.",
}

export function NewsForm(props){
  
  let titleInput = null;
  let shortDescriptionInput = null;
  let textInput = null;
  let hashTagsInput = [];

  const { onAddNewsItem } = props;
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [hashTagsError, setHashTagsError] = useState(false);

  function handleSubmit(e){
    e.preventDefault();
    const id = faker.datatype.uuid();
    let title = titleInput.value;
    let shortDescription = shortDescriptionInput.value;
    let text = textInput.value;
    let photo = faker.image.imageUrl()+faker.datatype.number({ min: 0, max: 10 });
    let author = AUTHORS[faker.datatype.number({ min: 0, max: AUTHORS.length - 1 })];
    let rowHashTags = hashTagsInput.map((e, i)=>{return e.checked&&HASHTAGS[i].value});
    let hashTags=[];
    
    for(let i=0; i<rowHashTags.length; i++){
      if(rowHashTags[i]){hashTags.push(rowHashTags[i])}
    }

    if(!title){setTitleError(true)};
    if(!text){setTextError(true)};
    if(hashTags.length === 0){setHashTagsError(true)};

    const news = {
      id,
      title, 
      shortDescription,
      text, 
      photo,
      author, 
      hashTags
    };
    
    if(title && text && hashTags){onAddNewsItem({news})};
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>Title:
          <input 
            ref = {(node) => titleInput = node}
            type = "text" 
            name = "title">
          </input>
        </div>
        {titleError && (<span style={{ color: 'red' }}>{ERRORS.title}</span>)}

        <div>Short Description:<textarea 
          ref={(node) => shortDescriptionInput = node}
          name="shortDescription"/>
        </div>

        <div>Text:<textarea 
          ref={(node) => textInput = node}
          name="text"/>
        </div>
        {textError && (<span style={{ color: 'red' }}>{ERRORS['text']}</span>)}
        
        <div>
          <span>HashTags:</span>
          {HASHTAGS.map((e, i) => (
            <label key={e.value}>
            <input
              type="checkbox"
              ref={(node) => hashTagsInput[i] = node}
            /><span>{e.label}</span>
            </label>
          ))}
        </div>
        {hashTagsError && (<span style={{ color: 'red' }}>{ERRORS['hashTags']}</span>)}
          
        <button type="submit">Create news</button>
      </form>
    </div>
  );  
}

NewsForm.propTypes = {
  onAddNewsItem: PropTypes.func.isRequired,
};

NewsForm.defaultProps = {};