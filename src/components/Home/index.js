import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {HiOutlineShoppingCart} from 'react-icons/hi'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import MenuCardItems from '../MenuCardItems'

import DishItems from '../DishItems'

import './index.css'

class Home extends Component {
  state = {
    restaurantName: '',
    menuList: [],
    presentTab: 'Salads and Soup',
    cartCounter: 0,
  }
  componentDidMount() {
    this.renderApiCall()
  }

  renderApiCall = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const response = await fetch(url)
    const data = await response.json()

    console.log(data)
    this.setState({
      menuList: data[0].table_menu_list,
      restaurantName: data[0].restaurant_name,
    })
  }

  currentTab = id => {
    this.setState({presentTab: id})
  }

  minusonCounter = () => {
    this.setState(prevState => ({cartCounter: prevState.cartCounter - 1}))
  }

  addonCounter = () => {
    this.setState(prevState => ({cartCounter: prevState.cartCounter + 1}))
  }

  render() {
    const {menuList, presentTab, restaurantName, cartCounter} = this.state
    let categoryDishes
    if (menuList.length > 0) {
      categoryDishes = menuList.find(
        category => category.menu_category === presentTab,
      ).category_dishes

      console.log(categoryDishes)
    }

    return (
      <div className="bg-container">
        <navbar className="nav-container">
          <h1 className="main-heading">{restaurantName}</h1>
          <div className="order-container">
            <p className="para">My Orders</p>
            <HiOutlineShoppingCart className="icon" />
            <p className="cart-count">{cartCounter}</p>
          </div>
        </navbar>
        <hr className="line" />
        <ul className="list-container">
          {menuList.map(eachItem => (
            <MenuCardItems
              key={eachItem.menu_category}
              tabDetails={eachItem}
              currentTab={this.currentTab}
            />
          ))}
        </ul>
        <hr className="line" />
        {menuList.length > 0 ? (
          <ul className="menu-item-container">
            {categoryDishes.map(eachMenu => (
              <DishItems
                key={eachMenu.dish_id}
                dishDetails={eachMenu}
                minusonCounter={this.minusonCounter}
                addonCounter={this.addonCounter}
              />
            ))}
          </ul>
        ) : (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        )}
      </div>
    )
  }
}

export default Home
