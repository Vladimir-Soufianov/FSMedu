import React from 'react';
import "../incs/footer.css"
import {MDBInput,MDBCol,MDBRow,MDBContainer,MDBFooter} from 'mdb-react-ui-kit';
import { Button } from "antd";
import BackTop from '../incs/BackTop';
import { FaFacebook } from 'react-icons/fa6';


export const Footer = () => {
  return (
    <>
    <MDBFooter className='text-center' color='white' bgColor='dark'>
      <MDBContainer className='p-4'>
        <section className=''>
          <form action=''>
            <MDBRow className='d-flex justify-content-center'>
              <MDBCol size="auto">
                <p className='pt-2'>
                  <strong>Inscrivez-vous à notre newsletter</strong>
                </p>
              </MDBCol>
              <MDBCol md='5' start>
                <MDBInput contrast type='email'  className='mb-4' />
              </MDBCol>
              <MDBCol size="auto">
              <Button type="primary">S'abonner</Button>
              </MDBCol>
            </MDBRow>
          </form>
        </section>
        </MDBContainer>
    </MDBFooter>
    <div className="footer">
        <div className="sb_footer section_padding">
            <div className="sb_footer-links">
                <div className="sb_footer-links-div">
                    <h2>Contacter nous :</h2>
                    <p>Numéro 1 : 05 35 53 73 21</p>
                    <p>Numéro 2 : 05 35 53 88 70</p>
                    <p>Email : fs-contact@umi.ac.ma</p>
                    <p>Autre email : doyen.fs@umi.ac.ma </p>
                  
                </div>
                <div className="sb_footer-links-div2">
                    <h2>Autres établissements :</h2>
                    <p>Faculté de Lettres et des SH :
                    <a href='https://www.flsh.umi.ac.ma/'>  lien </a>
                    </p>
                    <p>Faculté de Sc Juridiques, Eco et Sociales :
                    <a href='http://www.fsjes-umi.ac.ma/'> lien</a>
                    </p>
                    <p>Faculté des Sciences et Techniques :
                    <a href='https://www.fste-umi.ac.ma'> lien</a>
                    </p>
                    <p>Faculté Polydisciplinaire:
                    <a href='https://www.fpe.umi.ac.ma'> lien</a>
                    </p>
                    <p>Ecole Supérieure de Technologie :
                    <a href='https://www.est-umi.ac.ma'> lien</a>
                    </p>
                    <p>ENSAM :
                    <a href='https://www.ensam-umi.ac.ma'> lien</a>
                    </p>
                    <p>Ecole Normale Supérieure :
                    <a href='https://www.ens.umi.ac.ma'> lien</a>
                    </p>
                    <p>ENCG :
                    <a href='https://www.encg.umi.ac.ma'> lien</a>
                    </p>
                </div>
                <div className="sb_footer-links-map">
                    <h3>Localisation :</h3>
                <iframe title="localisation" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5116.137557028687!2d-5.549515246707792!3d33.86541146456513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda04541bd14ccf7%3A0xa342e2dd2b480171!2sFaculty%20of%20Sciences%20-%20Moulay%20Ismail%20University!5e0!3m2!1sfr!2sma!4v1716487242869!5m2!1sfr!2sma" 
                width="400" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <hr></hr>
           <BackTop/>
            <div className="sb_footer-below">
            <div className="sb_footer-copyright">
                <p> ©2024 Tous droits réservés
                </p>
                </div>
                </div>
        </div>
    </div>
    </>
  )
}

