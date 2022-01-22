import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import faker from 'faker';
import { HASHTAGS, AUTHORS } from "../data";
import { getBase64 } from "./utils";

const ERRORS = {
  title: "Title cannot be empty.",
  text: "Text cannot be empty.",
  photo: "Photo is not selected.",
  hashTags: "Hash tags are not selected."
}

export function NewsForm(props){
  
  let titleInput = useRef(null);
  let shortDescriptionInput = useRef(null);
  let textInput = useRef(null);
  let hashTagsInput = useRef([]);
  let photoInput = useRef(null);
  let authorInput = useRef(null);

  const { onAddNewsItem } = props;
  const [titleError, setTitleError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [hashTagsError, setHashTagsError] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();

    const id = faker.datatype.uuid();

    let title = titleInput.current?.value;
    let shortDescription = shortDescriptionInput.current?.value;
    let text = textInput.current?.value;
    let photo = await getBase64(photoInput.current?.files[0], (base64 => { return base64 }));
    let author = '';
    for(let i =0; i<4; i++){
      if(authorInput.current.children[i].children[0].checked) author = authorInput.current.children[i].innerText
    }
    
    let rowHashTags = hashTagsInput.current?.map((e, i)=>{return e.checked&&HASHTAGS[i].value});
    let hashTags=[];
    for(let i=0; i<rowHashTags.length; i++){
      if(rowHashTags[i]){hashTags.push(rowHashTags[i])}
    }

    if(!title){setTitleError(true)};
    if(!text){setTextError(true)};
    if(!photo){setPhotoError(true)};
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
            ref = {titleInput}
            type = "text" 
            name = "title">
          </input>
        </div>
        {titleError && (<span style={{ color: 'red' }}>{ERRORS.title}</span>)}

        <div>Short Description:<textarea 
          ref={shortDescriptionInput}
          name="shortDescription"/>
        </div>

        <div>Text:<textarea 
          ref={textInput}
          name="text"/>
        </div>
        {textError && (<span style={{ color: 'red' }}>{ERRORS['text']}</span>)}
        
        <div>
          <span>HashTags:</span>
          {HASHTAGS.map((e, i) => (
            <label key={e.value}>
            <input
              type="checkbox"
              ref={e => hashTagsInput.current[i] = e}
            /><span>{e.label}</span>
            </label>
          ))}
        </div>
        {hashTagsError && (<span style={{ color: 'red' }}>{ERRORS['hashTags']}</span>)}
          
        <div>Photo:<input 
          type="file"
          accept=".jpeg,.png"
          ref={photoInput}
          name="photo"/>
        </div>
        {photoError && (<span style={{ color: 'red' }}>{ERRORS['photo']}</span>)}
        
        <span>Author:</span>
        <div ref={authorInput}>
          {AUTHORS.map((e,i) => (
            <label key={e+i }>
            <input
              key={e+i}
              type="radio"
              name="authors"
              defaultChecked
            /><span>{e}</span>
            </label>
          ))}
        </div>

        <button type="submit">Create news</button>
      </form>
    </div>
  );  
}

NewsForm.propTypes = {
  onAddNewsItem: PropTypes.func.isRequired,
};

NewsForm.defaultProps = {};