import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick.js";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext(null);

const Menus = ({ children }) => {
  const [openID, setOpenID] = useState("");
  const [position, setPosition] = useState(null);

  const closeMenu = () => setOpenID("");
  const openMenu = setOpenID;

  return (
    <MenusContext.Provider
      value={{ openID, closeMenu, openMenu, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { openID, closeMenu, openMenu, setPosition } = useContext(MenusContext);
  const handleClick = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openID === "" || +openID !== id ? openMenu(id) : closeMenu();
  };

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ id, children }) => {
  const { openID, position, closeMenu } = useContext(MenusContext);
  const ref = useOutsideClick(closeMenu);

  if (openID !== id) return null;
  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
};

const Button = ({ children, icon, onClick }) => {
  const { closeMenu } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    closeMenu();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon} <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
Menus.ListButton = List;

export default Menus;
