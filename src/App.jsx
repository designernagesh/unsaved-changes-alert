import { useState, useEffect } from 'react';

function App() {
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  const inputHandler = () => {
    setUnsavedChanges(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setUnsavedChanges(false);
  };
  
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (unsavedChanges) {
        const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <>
      <div className="container">
        <h2 className="title">Unsaved Changes Alert</h2>
        <p className="sub-title">Fill the form and try to close the tab: 😊 </p>

        <form id="myForm" onSubmit={submitHandler}>
          <label htmlFor="name"> Name </label>
          <input id="name" type="text" name="name" onInput={ inputHandler } />

          <label htmlFor="email"> Email </label>
          <input type="email" id="email" name="email" onInput={ inputHandler } />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;
