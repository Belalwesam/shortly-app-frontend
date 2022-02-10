import React, { useEffect, useState } from "react";
import { fetchLinks, shortenLink, deleteLink } from "../hooks/useLinks";
import Brand from "../images/icon-brand-recognition.svg";
import Records from "../images/icon-detailed-records.svg";
import Custome from "../images/icon-fully-customizable.svg";
import Trash from "../images/trash-outline.svg";
import { useContext } from "react";
import { AuthContext } from "../hooks/AuthContext";
const Links = () => {
  const { isActive } = useContext(AuthContext);
  const [inputError, setInputError] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [links, setLinks] = useState<any>([]);
  const [noLinks, setNoLinks] = useState(false);
  const handleCopyClick = (e: any) => {
    document
      .querySelectorAll(".copy-btn")
      .forEach((btn) => (btn.innerHTML = "Copy"));
    document
      .querySelectorAll(".copy-btn")
      .forEach((btn) => btn.classList.remove("clicked"));
    e.target.classList.add("clicked");
    e.target.innerText = "Copied!";
    navigator.clipboard.writeText(e.target.getAttribute("data-short-link"));
  };
  const init = async () => {
    const fetchedLinks = await fetchLinks();
    setLinks(fetchedLinks);
  };
  const handleSubmit = (e: any) => {
    setInputError(false);
    e.preventDefault();
    if (url === "") {
      setInputError(true);
    } else {
      shortenLink(url);
      init();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteLink(id);
    init();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <section className={`links-section`}>
      <div className="links-section-inner-wrapper">
        <div className="container">
          <div className={`form-wrapper ${isActive ? "" : "d-none"}`}>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
              <div className="row">
                <div className="col-12 col-md-10">
                  <input
                    type="url"
                    placeholder="Your URL here ..."
                    className={`form-control ${inputError ? "is-invalid" : ""}`}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </div>
                <div className="col-12 col-md-2">
                  <button type="submit">Shorten it!</button>
                </div>
              </div>
            </form>
          </div>
          <div className={`my-links-list ${isActive ? "" : "d-none"}`}>
            <ul className="list-unstyled m-0">
              {links !== undefined && links.length > 0
                ? links.map((link: any) => (
                    <li className="m-0" key={link.id}>
                      <div className="delete-btn-container">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(link.id)}
                        >
                          <img src={Trash} alt="" width={20} />
                        </button>
                      </div>
                      <span className="original-link">
                        <a href={`${link.original_url}`}>{link.original_url}</a>
                      </span>
                      <div className="copy-container">
                        <span className="short-link">
                          <a href={link.short_url}>{link.short_url}</a>
                        </span>
                        <button
                          data-short-link={link.short_url}
                          onClick={(e) => handleCopyClick(e)}
                          className="copy-btn"
                        >
                          Copy
                        </button>
                      </div>
                    </li>
                  ))
                : "You don't have any links."}
            </ul>
          </div>
        </div>
        <div className="stats">
          <div className="container">
            <div className="stats-heading text-center">
              <h2 className="m-0">Advanced Statistics </h2>
              <p className="m-0">
                {" "}
                Track how your links are performing across the web with our
                advanced statistics dashboard.
              </p>
            </div>
            <div className="stats-boxes">
              <div className="row">
                <div className="col-12 col-md-4">
                  <div className="single-stat">
                    <div className="single-stat-wrapper">
                      <div className="single-stat-img">
                        <img src={Brand} alt="stat icon" />
                      </div>
                      <div className="single-stat-text">
                        <h4 className="m-0">Brand Recognition</h4>
                        <p className="m-0">
                          Boost your brand recognition with each click. Generic
                          links don’t mean a thing. Branded links help instil
                          confidence in your content.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="single-stat my-push trans-1">
                    <div className="single-stat-wrapper">
                      <div className="single-stat-img">
                        <img src={Records} alt="stat icon" />
                      </div>
                      <div className="single-stat-text">
                        <h4 className="m-0">Detailed Records</h4>
                        <p className="m-0">
                          Gain insights into who is clicking your links. Knowing
                          when and where people engage with your content helps
                          inform better decisions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="single-stat my-push trans-2">
                    <div className="single-stat-wrapper">
                      <div className="single-stat-img">
                        <img src={Custome} alt="stat icon" />
                      </div>
                      <div className="single-stat-text">
                        <h4 className="m-0">Fully Customizable</h4>
                        <p className="m-0">
                          Improve brand awareness and content discoverability
                          through customizable links, supercharging audience
                          engagement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Links;
