import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppBar from "./components/AppBar";
import SignInView from "./views/SignInView";
import SignUpView from "./views/SignUpView";
import UserView from "./views/UserView";
import ErrorView from "./views/ErrorView";
import "./styles/main.scss";
import ItemsView from "./views/ItemsView";
import AddItemView from "./views/AddItemView";
import UserCollectionView from "./views/UserCollectionView";
import ItemPageView from "./views/ItemPageView";

function App() {
  return (
    <BrowserRouter>
      <AppBar />
      <Container>
        <Routes>
          <Route path="/" element={<SignInView />} />
          <Route path="/sign-in" element={<SignInView />} />
          <Route path="/sign-up" element={<SignUpView />} />
          <Route path="/user" element={<UserView />} />
          <Route path="/items" element={<ItemsView />} />
          <Route path="/item/*" element={<ItemPageView />} />
            <Route path="/add-item" element={<AddItemView />} />
            <Route path="/collection" element={<UserCollectionView />} />
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
