import React from "react";
import styled from "styled-components";

const BtnForModalBack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 99;
  transition: 0.15s;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function BackDrop({ show, errorForm }) {
  return show ? <BtnForModalBack onClick={errorForm} /> : null;
}

export default BackDrop;
