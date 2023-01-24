import FormaContactPage from './FormaContactPage'

function ContactPage() {

    function send(name, phoneNumber, message) {
        alert('Name:' + name + ' Phone number:' + phoneNumber + ' Message:' + message);
    
    }
    
    return (
        
        <div className="contactpage_div">
            <FormaContactPage send={send} />
        </div>
    );
}

export default ContactPage;
