import { useEffect, useState } from 'react';
import './App.css'
import Header from './components/Header.jsx'

function App() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [lightTheme, setLightTheme] = useState(false);

  /* changes the page theme to light mode or vice versa */
  function chnageThemeStatus() {
    setLightTheme(prevTheme => prevTheme = !prevTheme);

        function lightThemeOn() {
          const mainHeader = document.querySelector(".main-header");
          const logoName = document.querySelector(".logoName");
          const optionButtonsContainer = document.querySelectorAll(".option-buttons-container button");
          const extensionsListTitle = document.querySelector(".extensions-list h2");
          const sunIcon = document.querySelector(".sun-icon");
          const moonIcon = document.querySelector(".moon-icon");

          mainHeader.classList.toggle("light-theme-cards");
          logoName.classList.toggle("titles-light-theme");
          
          extensionsListTitle.classList.toggle("titles-light-theme");

          optionButtonsContainer.forEach(button => {
              button.classList.toggle("light-theme-buttons");
          })
          document.body.classList.toggle("body-background-light-theme");

          moonIcon.classList.toggle("active");
          moonIcon.classList.toggle("inactive");
          moonIcon.parentElement.classList.toggle("dark-theme-button");
          sunIcon.classList.toggle("inactive");
      }
    lightThemeOn()
  }
  
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('data.json');
      const result = await response.json();
      setData(result)
    }
    fetchData()
  }, [])

  /* removes an extension when the delete button is clicked */
  function removeItem(event){
    const extensionName = (event.target.parentElement.parentElement.querySelector(".extension-information p:first-child")).textContent;
    setData(prevItems => prevItems.filter(item => item.name !== extensionName));
  }

  /* toggles the active status of the extension between on/off */
  function updateActiveStatus(event) {
    const extensionName = event.target.parentElement.parentElement.parentElement.querySelector(".extension-information p:first-child").textContent;
    setData(prevItems => prevItems.map(item => 
      item.name === extensionName ? {...item, isActive: !item.isActive} : item
    ))
  }

  /* changes the filter status */
  function showAllActive() {
    setFilter("active");
  }
  function showAllInactive() {
    setFilter("inactive");
  }
  function showAllData() {
    setFilter("all");
  }

  const displayData = data.filter(item => {
    if(filter === "all") return item;
    if(filter === "active") return item.isActive;
    if(filter === "inactive") return !item.isActive;
  })

  const highlight = {
    outline: "2px solid hsl(3, 71%, 56%)",
    boxShadow: "0px 0px 10px hsl(3, 71%, 56%)",
    transition: "0.5s"
  };

  return (
    <>
      <div style={{maxWidth: "1440px", margin: "0 auto"}}>
        <Header changeTheme={chnageThemeStatus}/>
      </div>
      
      <div className='extensions-list-container wrapper'>

        <div className='extensions-list'>
          <h2 className>Extensions List</h2>
          <div className='option-buttons-container'>
            <button onClick={showAllData} style={filter === "all" ? highlight : {}}>All</button>
            <button onClick={showAllActive} style={filter === "active" ? highlight : {}}>Active</button>
            <button onClick={showAllInactive} style={filter === "inactive" ? highlight : {}}>Inactive</button>
          </div>
        </div>

        <div className="extensions">
          {displayData.map((item, index) => (
            <div key={index} className={`extension-card ${lightTheme ? "light-theme-cards" : ""}`}>

              <div style={{display: "flex", gap: "15px", marginBottom: "50px"}}>
                <img src={`${item.logo}`} alt={item.name} style={{alignSelf: "start"}}/>
                <div className='extension-information'>
                  <p className={lightTheme ? "light-theme-cards-text" : ""}>{item.name}</p>
                  <p className={lightTheme ? "light-theme-cards-text" : ""}>{item.description}</p>
                </div>
              </div>

              <div className='extension-buttons'>
                <button className={`remove-button ${lightTheme ? "light-theme-cards" : ""}`} onClick={removeItem}>Remove</button>
                <div className='switch' onClick={updateActiveStatus}>
                  <label>
                    <input type="checkbox" className='switch-checkbox' checked={item.isActive} onChange={() => {}}/>
                  </label>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App