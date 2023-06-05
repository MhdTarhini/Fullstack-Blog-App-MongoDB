import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [EmailAddress, seEmailAddress] = useState("");
  const [DateofBirth, setDateofBirth] = useState("");

  async function register(e) {
    const UserData = new FormData();
    UserData.set("username", username);
    UserData.set("password", password);
    UserData.set("EmailAddress", EmailAddress);
    UserData.set("ProfileImage", ProfileImage[0]);
    UserData.set("DateofBirth", DateofBirth);
    e.preventDefault();
    console.log(UserData);
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: UserData,
      // headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert("Resgistration failed");
    }
  }
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <label htmlFor="ProfileImage">Profile Image</label>
      <input
        type="file"
        name="ProfileImage"
        id="ProfileImage"
        onChange={(e) => setProfileImage(e.target.files)}
      />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="Email Address">Email Address</label>
      <input
        type="Email"
        id="Email Address"
        value={EmailAddress}
        onChange={(e) => seEmailAddress(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="Date of Birth">Date of Birth</label>
      <input
        type="date"
        id="Date of Birth"
        value={DateofBirth}
        onChange={(e) => setDateofBirth(e.target.value)}
      />

      <button>Register</button>
    </form>
  );
}