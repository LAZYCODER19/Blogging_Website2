import { BrowserRouter, Route ,Routes } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"
import { Publish } from "./pages/Publish"
import { useEffect,useState } from "react"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
      // Check if the token exists in localStorage
      const token = localStorage.getItem("token");
      if (token) {
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
  }, []);
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          {isLoggedIn ? <Route path="/" element={<Blogs></Blogs>}></Route> : <Route path="/" element={<Signup></Signup>}></Route>}
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/signin" element={<Signin></Signin>}></Route>
          <Route path="/blog/:id" element={<Blog></Blog>}></Route>
          <Route path="/blogs" element={<Blogs></Blogs>}></Route>
          <Route path="/publish" element={<Publish></Publish>}></Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App


