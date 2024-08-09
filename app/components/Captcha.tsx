import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface CaptchaProps {
  onVerify: (token: string | null) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
    onVerify(token);
  };

  return (
    <ReCAPTCHA
      sitekey="6LdUPCMqAAAAAB0t0kReML09SZXE9a_2srbp5tFN"
      onChange={handleCaptchaChange}
    />
  );
};

export default Captcha;
