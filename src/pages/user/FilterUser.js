import React, { useState } from "react";

function FilterUser(props) {
  const { onFilter } = props;
  const [keyword, setKeyword] = useState("");

  function onChangeKeyword(e) {
    setKeyword(e.target.value);
  }

  const onSubmitFilter = (e) =>{
    e.preventDefault();
    onFilter({keyword});
  }

  return (
    <>
      <form action="" onSubmit={onSubmitFilter}>
        <div className="search_box">
          <input
            type="text"
            onChange={onChangeKeyword}
            value={keyword}
            placeholder="Search"
          />
          <button>
            <i className="fa fa-search"></i>
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterUser