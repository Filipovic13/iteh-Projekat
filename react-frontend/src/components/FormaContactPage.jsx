import { useState } from "react";

function FormaContactPage(props) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  function handleNameInput(e) {
    setName(e.target.value);
  }

  function handlePhoneNumberInput(e) {
    setPhoneNumber(e.target.value);
  }

  function handleMessageInput(e) {
    setMessage(e.target.value);
  }
  const style = {
    backgroundColor: "black",
    textAlign: "center",
    borderRadius: "25px",
    border: "2px solid #FFFFFF",
    marginTop: "50px",
    marginBottom: "80x",
    // marginRight: "300px",
    marginLeft: "600px",
    padding: "20px",
    width: "300px",
  };

  return (
    <div style={style}>
      <div className="form">
        <div className="formacontactpage_div">
          <form id="formacontact_div">
            <div className="input-container">
              <label>Name: </label>
              <input
                type={"text"}
                className="form-control mt-2 mb-2"
                value={name}
                onChange={handleNameInput}
                required
              />
            </div>
            <div className="input-container">
              <label>Phone number: </label>
              <input
                type={"text"}
                className="form-control mt-2 mb-2"
                value={phoneNumber}
                onChange={handlePhoneNumberInput}
                required
              />
            </div>
            <div className="input-container">
              <label>Message: </label>
              <textarea
                className="form-control mt-3 mb-3"
                value={message}
                onChange={handleMessageInput}
              />
            </div>
            <button
              className="button"
              button
              type="button"
              id="btn_send"
              onClick={() => props.send(name, phoneNumber, message)}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormaContactPage;
