import styles from "./style";
import { logo } from "../../assets";
import { footerLinks, socialMedia } from "../../constants";
import { Img } from "react-image";
import { Link } from "react-router-dom";

const Footer = () => (
  <section
    className={`${styles.flexCenter} ${styles.paddingY} flex-col px-4 md:px-8 lg:px-16 xl:px-20`}
    data-aos="fade-up"
    style={{
      background: "#166ce51f",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(50px)",
      WebkitBackdropFilter: "blur(10px)",
    }}
  >
    <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
      <div className="flex-[1] flex flex-col justify-start">
        {/* <Img
          src={logo}
          alt="hoobank"
          className="w-[266px] h-[72.14px] object-contain"
        /> */}
        <p className={`${styles.paragraph} mt-4 max-w-[312px]`}>
          Empowering rural communities through sustainable enterprises and
          digital innovation, JPM Society transforms local resources into
          lasting livelihoods.
        </p>
      </div>

      <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10 text-black">
        {footerLinks.map((footerlink) => (
          <div
            key={footerlink.title}
            className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
          >
            <h4 className="font-nexa font-medium text-3xl leading-[27px] ">
              {footerlink.title}
            </h4>
            <ul className="list-none mt-4">
              {footerlink.links.map((link, index) => (
                <li
                  key={link.name}
                  className={`text-[16px] leading-[24px] cursor-pointer${
                    index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                  }`}
                >
                  {link.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
      <div className="flex flex-row md:mt-0 mt-6">
        {socialMedia.map((social, index) => (
          <Img
            key={social.id}
            src={social.icon}
            alt={social.id}
            className={`w-[21px] h-[21px] object-contain cursor-pointer ${
              index !== socialMedia.length - 1 ? "mr-6" : "mr-0"
            }`}
            onClick={() => window.open(social.link)}
          />
        ))}
      </div>
    </div>

  </section>
);

export default Footer;
