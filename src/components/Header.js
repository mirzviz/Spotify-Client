import style from 'styled-components';
import React, { Component } from 'react';
import toolImage from '../resorces/tool.jpg'

const HeaderImage = style.header`
  min-height: 100vh;
  background: url(${toolImage}) center/cover fixed no-repeat;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity: 0.8;
  z-index: 0.9;
`

const SyledHeader = style.h1`
  text-transform: uppercase;
  color: white;
  font-size: 70px;
  padding: 60px;
`
export default class Header extends Component {
    render() {
        return (
            <>
            <HeaderImage>
            <SyledHeader>Welcome! scroll down</SyledHeader>
            </HeaderImage>
            </>
        )
    }
}
