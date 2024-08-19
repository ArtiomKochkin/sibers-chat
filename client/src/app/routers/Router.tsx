import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const HomePage = lazy(() =>
  import('@pages/HomePage').then(module => ({ default: module.HomePage }))
);
const ChatPage = lazy(() => 
  import('@pages/ChatPage').then(module => ({ default: module.ChatPage}))
);

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<ChatPage/>}/>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}