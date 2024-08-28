import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles.css'

const About = () => {
  useEffect(() => {
    document.title = 'NoteWhril - Best Note Taking App';
  }, []);
  return (
    <main className="marginTop-50" >
      <div className="bg-Purple">
        <h1
          className="d-flex justify-content-center align-items-center my-5"
          style={{ fontFamily: "Microsoft JhengHei UI", fontSize: "5vw" }}
        >
          Tame your work,
          <br />
          organize your life
        </h1>
        <p
          className="d-flex justify-content-center align-items-center"
          style={{
            fontFamily: "Microsoft JhengHei UI",
            fontSize: "1.5vw",
            lineHeight: "1",
          }}
        >
          Remember everything and tackle any project with your notes,
        </p>
        <p
          className="d-flex justify-content-center align-items-center"
          style={{
            fontFamily: "Microsoft JhengHei UI",
            fontSize: "1.5vw",
            lineHeight: "0.5",
          }}
        >
          tasks, and schedule all in one place.
        </p>
        <Link
          className="d-flex justify-content-center align-items-center btn mx-auto my-5 purpleBtn"
          style={{
            width: "20vw",
            height: "5vw",
            fontSize: "1.3vw"
          }}
          to="/signup"
          role="button"
        >
          Get NoteWhirl free
        </Link>
        <pre className="d-flex justify-content-center pb-5" style={{ fontFamily: "Microsoft JhengHei UI", fontSize: "1.3vw" }}>
          Already have an account? <Link to="/login" style={{ color: 'black'}}>Log in now</Link>
        </pre>
      </div>
    </main>
  );
};

export default About;
