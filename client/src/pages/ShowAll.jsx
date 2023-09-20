import { useEffect, useState } from "react";
import { Heading, NavCard } from "../components";
import queryString from "query-string";
import { Row } from "react-bootstrap";

export const ShowAll = () => {
  const [currentView, setCurrentView] = useState("clients");

  useEffect(() => {
    const { title } = queryString.parse(window.location.search);
    if (title) setCurrentView(title);
    // eslint-disable-next-line
  }, [window.location]);

  return (
    <>
      <Heading heading={currentView} />
      <Row className="p-3 px-5 m-0 mb-3">
        {currentView === "clients" && (
          <>
            <NavCard
              imageSrc={require("../assets/1.jpg")}
              title="Abdul Raheem"
              details={[
                { heading: "CNIC", paragraph: "3810361753177" },
                { heading: "Address", paragraph: "Johar Town, Lahore" },
                { heading: "Email", paragraph: "arhexlabs@gmail.com" },
              ]}
            />
          </>
        )}
        {currentView === "products" && (
          <>
            <NavCard
              imageSrc={require("../assets/1.jpg")}
              title="Abdul Raheem"
              details={["alkdsj als jdlkas jdlkajslkdjaslkdj salkjdlksaj"]}
            />
          </>
        )}
        {currentView === "vendors" && (
          <>
            <NavCard
              imageSrc={require("../assets/1.jpg")}
              title="Abdul Raheem"
              details={[
                { heading: "CNIC", paragraph: "3810361753177" },
                { heading: "Address", paragraph: "Johar Town, Lahore" },
                { heading: "Email", paragraph: "arhexlabs@gmail.com" },
              ]}
            />
          </>
        )}
      </Row>
    </>
  );
};