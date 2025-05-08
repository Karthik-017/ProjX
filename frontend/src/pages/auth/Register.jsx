import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthForm from "../../components/AuthForm";
import { register } from "../../services/auth";
import AuthContext from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // use login method from context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await register(formData);
      login(data.token); // Use login to store token and fetch user
      navigate("/"); // Redirect after successful login
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  };

  return (
    <AuthForm
      formType="register"
      formData={formData}
      onChange={handleChange}
      onSubmit={handleRegister}
    />
  );
};

export default Register;
