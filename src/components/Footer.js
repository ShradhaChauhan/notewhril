import React from "react";
import { Link } from "react-router-dom";
import noteWhrilLogo from '../assets/noteWhrilLogo.png'
import githubLogo from '../assets/github_logo.png'

const Footer = () => {
  return (
    <footer className="col-12 d-flex pt-5" style={{ position: 'relative', bottom: '16px', background: 'linear-gradient(rgb(111, 118, 232) 20%, rgb(174, 179, 242) 40%, rgb(255, 255, 255) 80%)'  }}>
      <Link className="col-4 navbar-brand mx-5 pt-5" to="/">
        <img
          className="mx-2"
          src={noteWhrilLogo}
          alt="noteWhrilLogo"
          height={30}
          width={30}
        />
        NoteWhirl
      </Link>
      <p className="col-4 pt-5" style={{fontSize: '14px' }}>© 2024 NoteWhirl Corporation. All rights reserved.</p>
      <Link className="col-4 float-end position-relative pt-5" style={{bottom: '10px', right: '-240px'}} to="">
        <img alt="github" src={githubLogo} height={50} width={50} />
      </Link>
    </footer>
  );
};

export default Footer;
