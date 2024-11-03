import "./App.css";
import { Layout } from "antd";
import Navbar from "./components/home/Navbar";
import MainContent from "./components/home/MainContent";
import FooterContainer from "./components/home/FooterContainer";
import { useEffect, useState } from "react";

const { Header, Content, Footer } = Layout;

function App() {
  const [currentSection, setCurrentSection] = useState("home-section");

  const handleSectionChange = (sectionId) => {
    setCurrentSection(sectionId);
  };

  return (
    <Layout>
      <Header className="home-header">
        <Navbar currentSection={currentSection} />
      </Header>
      <Content className="home-content">
        <MainContent onSectionChange={handleSectionChange} />
      </Content>
      <Footer className="home-footer">
        <FooterContainer />
      </Footer>
    </Layout>
  );
}

export default App;
