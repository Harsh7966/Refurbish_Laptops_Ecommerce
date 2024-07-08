import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="section bg-footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 footContent">
                        <div>
                            <h6 className="footer-heading text-uppercase ">Information</h6>
                            <ul className="list-unstyled footer-link mt-4">
                                <li><a href="">Pages</a></li>
                                <li><a href="">Our Team</a></li>
                                <li><a href="">Feuchers</a></li>
                                <li><a href="">Pricing</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 footContent">
                        <div>
                            <h6 className="footer-heading text-uppercase">Resources</h6>
                            <ul className="list-unstyled footer-link mt-4">
                                <li><a href="">Monitoring Grader</a></li>
                                <li><a href="">Video Tutorial</a></li>
                                <li><a href="">Term &amp; Service</a></li>
                                <li><a href="">Zeeko API</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-2 footContent">
                        <div>
                            <h6 className="footer-heading text-uppercase ">Help</h6>
                            <ul className="list-unstyled footer-link mt-4">
                                <li><a href="">Sign Up</a></li>
                                <li><a href="">Login</a></li>
                                <li><a href="">Terms of Services</a></li>
                                <li><a href="">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-4 footContent">
                        <div>
                            <h6 className="footer-heading text-uppercase">Contact Us</h6>
                            <p className="contact-info mt-4">Contact us if need help with anything</p>
                            <p className="contact-info">+01 123-456-7890</p>
                            <div className="mt-4">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><NavLink to="google.com"><img src="/google_icon.webp" width="23px"/></NavLink></li>
                                    <li className="list-inline-item"><NavLink to="fb.com"><img src="/fb_icon.webp" width="23px"/></NavLink></li>
                                    <li className="list-inline-item"><NavLink to="twitter.com"><img src="/Twitter_icon.png" width="23px"/></NavLink></li>
                                    <li className="list-inline-item"><NavLink to="instagram.com"><img src="/Insta_icon.png" width="23px"/></NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-5">
                <p className="footer-alt mb-0 f-14">2024 © Anup, All Rights Reserved</p>
            </div>
        </footer>
  );
}

