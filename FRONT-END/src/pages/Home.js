import React from 'react';
import './Home.css';

function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Let’s build from here</h1>
        <p>The world’s leading AI-powered developer platform.</p>
        <div className="cta-buttons">
          <input type="email" placeholder="Email address" />
          <button className="sign-up">Sign up for linX</button>
          <button className="enterprise-trial">Start a free enterprise trial</button>
        </div>
      </section>
    </main>
  );
}

export default Home;