import './App.scss'
import { AppShell } from "@mantine/core";
import Header from './components/header/Header'
import { Catalog } from './components/catalog/Catalog';

function App() {
  return (
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Header />

        <AppShell.Main>
          <Catalog />
        </AppShell.Main>
      </AppShell>
  )
}

export default App


