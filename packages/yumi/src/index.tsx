// import { render } from 'react-dom'
// const App = () => {
//   return <p>Hello!</p>
// }

// render(<App />, document.getElementById('app'))
import './main.css'
import App from './App.svelte'

const app = new App({
  target: document.body,
})

export default app
