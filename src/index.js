import React, {Component} from 'react'
import {render} from 'react-dom'
import PropTypes from 'prop-types'

let bookList=[
  {"title":"The Sun", "author":"Earnest H", "pages":200},
  {"title":"The Sun2", "author":"Earnest H", "pages":100},
  {"title":"The Sun3", "author":"Earnest H", "pages":400}
]

const Book=({title="No Title Provided", author="None", pages=0, freeBookmark})=>{
  return(
    <section>
      <p>{title}</p>
      <p>Author: {author}</p>
      <p>Pages: {pages}</p>
  <p>Free Bookmark Today: {freeBookmark ? 'Yes' : 'No'}</p>
    </section>
  )
}

const Hiring = () =>
  <div>
    <p>The Library is hiring. Check the website for more details</p>
  </div>
const NotHiring = ()=>
  <div>
    <p>The library is not hiring yet. Check back later.</p>
  </div>


class Library extends React.Component{
  
  static defaultProps = {
    books: [
      {"title": "Tahoe Tales", "author": "Orhan Pamuk", "pages": 800}
    ]
  }

  state = {
    open:true,
    freeBookmark: true,
    hiring:true,
    data :[],
    loading : false
  }
  
  componentDidMount(){
    this.setState({loading: true})
    fetch ('https://hplussport.com/api/products/order/price/sort/asc/qty/1')
      .then (data => data.json())
      .then (data => this.setState({data,loading:false}))
  }
  componentDidUpdate(){
    console.log ("Component has updated!")
  }

  toggleOpenClose = () => {
    this.setState (prevState => ({
      open: !prevState.open
    })) 
  }

  render(){
    console.log (this.state)
    const {books}=this.props
    return(
      <div>
        {this.state.hiring ? <Hiring /> : <NotHiring />}
        {
          this.state.loading ?
          "loading ..."
          : <div>
            {this.state.data.map (product => {
              return (
                <div key={product.id}>
                  <h3>Library Product of the Week: </h3>
                  <h4>{product.name}</h4>
                  <img alt={product.name} src={product.image} height={100} />
                </div>
              )
            })}
          </div>
        }
        <h1>The Library is {this.state.open ? 'open':'closed'}</h1>
    <button onClick={this.toggleOpenClose}>{this.state.open ? 'Close the Library' : 'Open the Library'}</button>
        {books.map(
          (book,i) => <Book 
          key={i}
          title={book.title} 
          author={book.author} 
          pages={book.pages}
          freeBookmark={this.state.freeBookmark}
          />
        )}
      </div>
    )
  }
}

Library.propTypes ={
  books: PropTypes.array
}

//We set the types for the book component's props
Book.propTypes={
  title:PropTypes.string,
  author:PropTypes.string,
  pages:PropTypes.number,
  freeBookmark:PropTypes.bool
}

render(
  <Library books={bookList}/>
  ,
  document.getElementById('root')
)
