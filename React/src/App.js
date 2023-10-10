import "./App.css";
import {BrowserRouter as Router, Routes ,Route} from 'react-router-dom';
import Homepage from './Pages/Homepage'
import ChatPage from './Pages/Chatpage'
import ChatProvider from './Context/ChatProvider';
import { ChakraProvider } from '@chakra-ui/react';
const App = ()=>{
  const design = (
    <>
   <Router>
   <ChatProvider>
      <ChakraProvider>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/chats'  element={<ChatPage/>}/>
        </Routes>
        </ChakraProvider>
    </ChatProvider>
   </Router>
    </>
  );
  return design;
};

export default App;