import { Search } from './Search';

export const Header = (props) => {
  return (
    <header className="App-header">
      <Search
        {...props}
      />
    </header>
  )
}