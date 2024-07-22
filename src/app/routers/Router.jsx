import { ChatPage } from "@pages/ChatPage";
import { HomePage } from "@pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}