import { Link } from "react-router-dom"
import logo from "/logo-54.png";
import { MapPin, Phone, Mail } from "lucide-react"
export default function Footer(){
    return (
        <>
            <footer className="bg-[#1a1a1a] dark:bg-black text-white pt-16 pb-8 border-t-4 border-[#FF9933]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            {/* <Dumbbell className="h-6 w-6 text-[#FF9933]" /> */}
                            <img src={logo} className="h-10 w-10" />
                            <span className="text-xl font-bold tracking-tight">Sardarewala Physical Training Academy</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Forging champions through discipline, strength, and endurance. Join the elite physical training academy of India.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-[#FF9933] font-bold text-lg mb-6">QUICK LINKS</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link to="/programs" className="hover:text-white transition-colors">Our Programs</Link></li>
                            <li><Link to="/pricing" className="hover:text-white transition-colors">Membership Plans</Link></li>
                            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FF9933] font-bold text-lg mb-6">PROGRAMS</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li>Army Selection Training</li>
                            <li>Police Physical Prep</li>
                            <li>Marathon Training</li>
                            <li>Strength & Conditioning</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-[#FF9933] font-bold text-lg mb-6">CONTACT US</h3>
                        <ul className="space-y-4 text-sm text-gray-300">
                            <li className="flex items-start">
                                <MapPin className="h-5 w-5 mr-3 text-[#138808]" />
                                <span>Village Sardarewala Near Ratia, <br />Haryana, India 125051</span>
                            </li>
                            <li className="flex items-center">
                                <Phone className="h-5 w-5 mr-3 text-[#138808]" />
                                <span>+91 97297 98025</span>
                            </li>
                            <li className="flex items-center">
                                <Mail className="h-5 w-5 mr-3 text-[#138808]" />
                                <span>contact@sardarewala.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Sardarewala Physical Training Academy. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}