import './App.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from 'react-icons/bs';

const API = "http://localhost:5000"

function App() {
  const [title, setTitle] = useState("")
  const [time, setTime] = useState("")
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false)

  //Load Objects on page
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const res = await fetch(API + "/todos")
      .then(response => response.json())
      .then(data => data)

      setLoading(false);
      setTodos(res);
    };

    loadData();
  }, [])

  //Post Object Function (form submit)
  const handleSubmit = async (e) => {
    e.preventDefault() //para que não recarregue a página e pare o fluxo SPA

    const todo = {
      id: Math.random(),
      title,
      time,
      done: false
    }
    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      }
    })

    setTodos((prevState) => [...prevState, todo]);//É como se fosse um cont +=
  

    setTime("")//Esses 2 comandos vão servir para limpar os inputs após salvar o objeto no db
    setTitle("")
  };

  //Delete Object Function
  const handleDelete = async (id) => {

    await fetch(API + "/todos/" + id, {
      method: "DELETE",
    });

    setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
  }

  //Edit Object Function
  const handleEdit = async (todo) => {
    todo.done = !todo.done;

    const data = await fetch(API + "/todos/" + todo.id, {
      method: "PUT",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) => prevState.map((td) => (td.id === data.id ? (td = data) : td))
    );
  }

  if (loading) {
    return (<p>Carregando...</p>)
  }

  return (
    <div className="App">
      <div className="todo-header">
        <h1>React ToDo</h1>
      </div>
      <div className="form-todo">
        <h2>Insira a sua próxima tarefa:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">O que você vai fazer ?</label>
            <input type="text"
              name="title"
              placeholder="Título da tarefa"
              onChange={(e) => setTitle(e.target.value)} /*"e" é o evento, target é o input e estou colocando no title o valor desse input */
              value={title || ""} /*Isso é uma forma dele poder começar com valor vazio e quando receber o valor do title ele troca */
              required
            />
          </div>
          <div className="form-control">
            <label htmlFor="time">Duração:</label>
            <input type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)} /*"e" é o evento, target é o input e estou colocando no title o valor desse input */
              value={time || ""} /*Isso é uma forma dele poder começar com valor vazio e quando receber o valor do title ele troca */
              required
            />
          </div>
          <input type="submit" value="Criar Tarefa" />
        </form>
      </div>
      <div className="list-todo">
        <h2>Lista de tarefas:</h2>
        {todos.length === 0 && <p>Não há tarefas!</p>} {/*É uma condicional caso todos.length === 0 seja verdadeiro ele renderiza o paragrafo Não há tarefas */}
        {todos.map((todo) => ( /*como quero que retorne JSX, então em vez de abrir {} se abre ()*/
          <div className="todo" key={todo.id}> {/*key=todo.id é para garantir que o id não vai se repetir */}
            <h3 className={todo.done ? "todo-done" : ""}>{todo.title}</h3>
            <p>Duração: {todo.time}</p>
            <div className="actions">
              <span onClick={() => handleEdit(todo)}>
                {!todo.done ? <BsBookmarkCheck /> : <BsBookmarkCheckFill />}
              </span>
              <BsTrash onClick={() => handleDelete(todo.id)} /> {/*se não colocar da forma de arrow function o código vai executar sempre mesmo sem clicar*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
