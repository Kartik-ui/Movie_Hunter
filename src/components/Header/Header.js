import React from 'react';
import "./Header.css";

function Header() {
  return (
    <div>
      {/* window.scorll(0,0) will move back us to the top */}
      <span onClick={()=>window.scroll(0,0) } className='header'>📹 Entertainment Box 📺</span>
    </div>
  )
}

export default Header
