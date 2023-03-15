import React, { useRef, useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import options from "./data"

function Page(){
    const typeaheadRef = useRef(null);
    const [selected, setSelected] = useState([]);
    return (
        <Typeahead
          multiple
          id="keep-menu-open"
          onChange={(selected) => {
            setSelected(selected);
            // Keep the menu open when making multiple selections.
            typeaheadRef.current.toggleMenu();
          }}
          options={options}
          placeholder="Choose a state..."
          ref={typeaheadRef}
          selected={selected}
        />
      );  



}
export default Page;