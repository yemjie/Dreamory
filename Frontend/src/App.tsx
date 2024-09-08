import { Route, Routes } from 'react-router-dom'
import { Box, useColorModeValue } from '@chakra-ui/react'
import HomePage from './pages/Home'
import AdminLogin from './pages/Admin_Login'
import AdminSignUp from './pages/Admin_SignUp'
import NavBar from './components/NavBar'
import EditEvent from './pages/Event_Edit'
import CreateEvent from './pages/Event_Create'

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue('white', 'gray.800')}>

      <NavBar />
      <Routes>
        <Route path="" element={<HomePage />}></Route>
        <Route path="/edit/:id" element={<EditEvent />}></Route>
        <Route path="/admin/event/create" element={<CreateEvent />}></Route>
        <Route path="/admin/login" element={<AdminLogin />}></Route>
        <Route path="/admin/signup" element={<AdminSignUp />}></Route>
      </Routes>
    </Box>
  )

}

export default App
