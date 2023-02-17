import React, { useEffect, useRef, useState } from 'react';
import style from './style/dropdownNavbar.module.css';

const DropdownNavbar = ({ items = [], dropdownTitle }) => {

    const activatorRef = useRef(null);
    const dropdownListRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    
    const clickHandler = () => {
        setIsOpen(!isOpen);
      };
    
      const keyHandler = event => {
        // console.log(event);
        if (event.key === "Escape" && isOpen) {
          setIsOpen(false);
        }
      };
    
      const clickOutsideHandler = event => {
        if (dropdownListRef.current) {
          if (
            dropdownListRef.current.contains(event.target) ||
            activatorRef.current.contains(event.target)
          ) {
            return;
          }
    
          setIsOpen(false);
        }
      };

      useEffect(() => {
        if (isOpen) {
          dropdownListRef.current.querySelector("a").focus();
          document.addEventListener("mousedown", clickOutsideHandler);
        } else {
          document.addEventListener("mousedown", clickOutsideHandler);
        }
      }, [isOpen]);

  return (
    <div className={style.dropdown_wrapper} onKeyUp={keyHandler}>
      <button
        className={style.dropdown_activator}
        aria-haspopup="true"
        aria-controls={null}
        onClick={clickHandler}
        ref={activatorRef}
      >
        {dropdownTitle}{" "}
        {isOpen ? (
          <svg
            height="24"
            fill="rgb(70,70,70)"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h24v24h-24z" fill="none" />
            <path d="m7.41 15.41 4.59-4.58 4.59 4.58 1.41-1.41-6-6-6 6z" />
          </svg>
        ) : (
          <svg
            height="24"
            fill="rgb(70,70,70)"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m0 0h24v24h-24z" fill="none" />
            <path d="m7.41 8.59 4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
          </svg>
        )}
      </button>
      <ul
        ref={dropdownListRef}
        className={`${style.dropdown_item_list} ${isOpen ? style.active : ""} `}
      >
        {items.map((item, index) => (
            <li key={index} className={style.item_list} >
              <a href={item.slug} onClick={item.handlerClick}>{item.anchor}</a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}


export default DropdownNavbar
