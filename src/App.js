import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'
import NotesList from './components/NotesList'
import Search from './components/Search'
import Header from './components/Header'

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: `“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.”
― Martin Fowler`,
      date: '5/04/2023',
    },
    {
      id: nanoid(),
      text: `“First, solve the problem. Then, write the code.” – John Johnson`,
      date: '5/04/2023',
    },
    {
      id: nanoid(),
      text: `“ Code is like humor. When you have to explain it, it’s bad.” – Cory House`,
      date: '5/04/2023',
    },
    {
      id: nanoid(),
      text: `“Fix the cause, not the symptom.” – Steve Maguire`,
      date: '5/04/2023',
    },
    {
      id: nanoid(),
      text: `“Before software can be reusable it first has to be usable.” – Ralph Johnson`,
      date: '5/04/2023',
    },
  ])
  const [searchText, setSearchText] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'))
    if (savedNotes) {
      setNotes(savedNotes)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes))
  }, [notes])
  const addNote = (text) => {
    const date = new Date()
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    }
    const newNotes = [...notes, newNote]
    setNotes(newNotes)
  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id)
    setNotes(newNotes)
  }

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
        <Search handleSearchNote={setSearchText} />
        <NotesList
          notes={notes.filter((note) =>
            note.text.toLocaleLowerCase().includes(searchText)
          )}
          handleAddNote={addNote}
          handleDeleteNote={deleteNote}
        />
      </div>
    </div>
  )
}

export default App
