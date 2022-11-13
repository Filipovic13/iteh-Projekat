import React, { Component } from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { CgInstagram } from "react-icons/cg";
import { BsBorderBottom, BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";


class  Naslovna extends Component{

    render() {
        const myStyle={

            height:'0vx',
            //fontSize:'20px',
            marginTop:'80px',
            backgroundSize: "cover",
            backgroundRepeat: 'no-repeat',
            AnimationEffect: 'pop 0.4s',
            textAlign: 'center',
         
  
    

        };
        const style={
          backgroundColor: 'white',
          opacity: 0.97,
          textAlign: 'center',
          borderRadius: "25px",
          border: "2px solid grey",
          marginTop: "50px",
          marginBottom: "60px",
          marginRight: "479px",
          marginLeft: "479px"
          
          }
          const myystyle = {
            color: "black",
            padding: "10px",
            fontFamily: "Arial"
          };
      
          const myystyle1 = {
            color: "grey",
            padding: "10px",
            fontFamily: "monospace",

            marginBottom: "200px"

          };
      
    
 
    return(
        <div>
        
        <div style={myStyle}>
        <div class="typewriter">
  <h1>Grappling fans, this is the place for you!
</h1>

</div>
          <h5 style={style}>
          <h3>ABOUT GRAPPLING</h3>
          Grappling, in hand-to-hand combat, describes sports that consist of gripping or seizing the opponent. Grappling is used at close range to gain a physical advantage over an opponent, either by imposing a position or causing injury. It is a broad term that encompasses many disciplines. These various martial arts can be practiced both as combat sports and for self-defense. Grappling contests often involve takedowns and ground control, and may end when a contestant concedes defeat, also known as a submission or tap out. Grappling most commonly does not include striking or the use of weapons. However, some fighting styles or martial arts known especially for their grappling techniques teach tactics that include strikes and weapons either alongside grappling or combined with it. Grappling techniques can be broadly subdivided into clinch fighting; takedowns and throws; submission holds and pinning or controlling techniques; and sweeps, reversals, turnovers, and escapes.

 </h5>
 <h2 style={myystyle1}>Check out our shop and upcoming tournaments!</h2>



        </div>
        <div>
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
          <button className="btn3">
          <CgInstagram />
        </button>

        <button className="btn3">
          <BsFacebook />
        </button>
        <button className="btn3">
          <BsYoutube />
        </button> 
        </div>

        
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Company name
              </h6>
              <p>
              Our site offers you free registration, so register quickly! It is intended for all grappling fans! Get the latest information on tournaments, stuff and everything else! Find out the latest information about tournaments!
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>More about tournaments</h6>
              <p>
                <a href='https://smoothcomp.com/en/event/8361' className='text-reset'>
                Old bridge Mostar open
                </a>
              </p>
              <p>
                <a href='https://smoothcomp.com/en/event/8630' className='text-reset'>
                8th Serbian Grappling cup
                </a>
              </p>
              <p>
                <a href='https://smoothcomp.com/cs/event/8008' className='text-reset'>
                ADCC Slovak open
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/products' className='text-reset'>
                  Products
                </a>
              </p>
              <p>
                <a href='/' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='/products' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='/' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Belgrade, 11000, RS
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                bjjtournaments@mail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2022 BJJ Tournaments
      </div>
    </MDBFooter>
    </div>
        
    </div>
    );
    }
    
 }
export default Naslovna;