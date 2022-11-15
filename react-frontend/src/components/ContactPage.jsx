import FormaContactPage from './FormaContactPage'

function ContactPage() {

    function send(name, phoneNumber, message) {
        alert('Name:' + name + ' Phone number:' + phoneNumber + ' Message:' + message);
    
    }
    
    return (
        
        <div className="contactpage_div">
            <h1 id='contact-us'>Contact us</h1>
            <FormaContactPage send={send} />
        </div>
    );
}

export default ContactPage;
