import './ContactSection.css';

const ContactSection = () => {

    return (
        <div className="contact-section">
            <div className="contact-email">
                <p>📧 contacto@arde.com</p>
            </div>
            <div className="contact-phone">
                <p>📱 +34-792194284</p>
            </div>
            <div className="contact-address">
                <p>📌 C. Metalurgia, 110, Norte, 41007 Sevilla</p>
            </div>
        </div>
    )
}

export default ContactSection;