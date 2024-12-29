import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import Router from "next/router";
import styles from "../styles/CollapsibleSearch.module.css";

const CollapsibleSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const textInput = useRef<HTMLInputElement>(null);

  const onSearchBlur = () => {
    setSearchBar(false);
  };

  const onSearchFocus = () => {
    setSearchBar(true);

    // Set timeout for 1ms to focus text input AFTER it renders
    setTimeout(() => {
      textInput.current?.focus();
    }, 1);
  };
  function submitSearchRequest(e: FormEvent) {
    e.preventDefault();
    if (searchValue.trim()) {
      Router.push(String("/search?query=" + searchValue));
    }
  }

  return (
    <div id={styles.collapsible_search_parent}>
      <form onSubmit={submitSearchRequest}>
        <div
          style={{
            display: !searchBar ? "block" : "none", // Icon is always the opposite visibility of the textbox
          }}
          id={styles.search_button}
          onClick={onSearchFocus}
        >
          <Image
            alt="Search"
            src="/images/search-button.svg"
            width={24}
            height={24}
          />
        </div>
        <input
          id={styles.search_textbox}
          style={{
            right: searchBar ? "0" : "-100px", // To animate coming from the right side
            opacity: searchBar ? "1" : "0",
            cursor: searchBar ? "auto" : "pointer",
            zIndex: searchBar ? 3 : -1,
            top: 0,
          }}
          placeholder="Search"
          onFocus={onSearchFocus}
          onChange={(e) => setSearchValue(e.target.value)}
          onBlur={onSearchBlur}
          ref={textInput}
        />
      </form>
    </div>
  );
};

export default CollapsibleSearch;
