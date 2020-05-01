import React from 'react';
import Clock from '../Widgets/Clock';
import UserProfileMenu from "../Widgets/UserProfileMenu";
import './Header.scss'

const Header = (props) => {
  return (
    <header className="header">
      <Clock clockClassNames="is-m-0auto-on-small" timeClassNames="has-theme-shade-inv-fg" dateClassNames="has-theme-accent-fg"/>
      <UserProfileMenu/>
    </header>
  );
};

export default Header;
