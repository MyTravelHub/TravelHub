import React from "react";

const SearcBar = () => {
    return ( 
        <div
        className="search-bar"
        style={{ backgroundColor: "#cecece" }}
      >
        <div className="search-container">
          <form action="/" method="get">
            <input
              type="text"
              id="header-search"
              placeholder="I need to find..."
              name="s"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
     );
}
 
export default SearcBar;