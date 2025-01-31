import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/images/DALL·E 2024-12-22 13.20.56 - A circular logo design featuring a German Shepherd dog with straight ears,.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
`;

const LoginBox = styled.div`
  width: 380px;
  padding: 30px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  text-align: center;
`;

const LogoImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #6a11cb;
    box-shadow: 0 0 5px rgba(106, 17, 203, 0.5);
  }
`;

const TogglePassword = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #6a11cb;
  cursor: pointer;

  &:hover {
    color: #2575fc;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
    transform: scale(1.03);
  }
`;

const LinkText = styled.p`
  font-size: 14px;
  color: #6a11cb;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
    color: #2575fc;
  }
`;

const Error = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 15px;
`;

const OTPInput = styled(Input)`
  text-align: center;
  letter-spacing: 4px;
`;

const Login = ({ onLogin }) => {
  const admins = [
    { username: "admin1", password: "password1", phone: "9876543210" },
    { username: "admin2", password: "password2", phone: "9876543222" },
  ];

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const admin = admins.find(
      (a) =>
        a.username === formData.username.trim() &&
        a.password === formData.password
    );

    if (admin) {
      setError("");
      onLogin(); // Trigger the login action
    } else {
      setError("Invalid username or password.");
    }
  };

  const handleForgotPassword = () => {
    setForgotPassword(true);
  };

  const handleSendOtp = () => {
    const admin = admins.find((a) => a.phone === phoneNumber.trim());
    if (admin) {
      setError("");
      setOtpSent(true);
      setOtp("1234"); // Example OTP for demonstration purposes
    } else {
      setError("Phone number not registered.");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setError("");
      setVerified(true);
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  const renderForgotPassword = () => (
    <>
      <Title>Forgot Password</Title>
      {!otpSent && !verified && (
        <>
          <InputContainer>
            <Input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </InputContainer>
          <Button onClick={handleSendOtp}>Send OTP</Button>
        </>
      )}
      {otpSent && !verified && (
        <>
          <InputContainer>
            <OTPInput
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </InputContainer>
          <Button onClick={handleVerifyOtp}>Verify OTP</Button>
        </>
      )}
      {verified && (
        <>
          <p>Your password is: <strong>password1</strong> (example)</p>
          <Button onClick={() => setForgotPassword(false)}>Back to Login</Button>
        </>
      )}
      {error && <Error>{error}</Error>}
    </>
  );

  return (
    <Container>
      <LoginBox>
        <LogoImage src={Logo} alt="Logo" />
        {!forgotPassword ? (
          <>
            <Title>Admin Login</Title>
            <form onSubmit={handleLogin}>
              <InputContainer>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </InputContainer>
              <InputContainer>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <TogglePassword onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </TogglePassword>
              </InputContainer>
              <Button type="submit">Login</Button>
            </form>
            <LinkText onClick={handleForgotPassword}>Forgot Password?</LinkText>
            {error && <Error>{error}</Error>}
          </>
        ) : (
          renderForgotPassword()
        )}
      </LoginBox>
    </Container>
  );
};

export default Login;
