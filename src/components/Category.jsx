import { Col, ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { 
  IoBeerSharp,       
  IoFastFoodSharp,   
  IoPizzaSharp,     
  IoWineSharp,            
  IoIceCreamSharp,         
  IoRestaurantSharp, 
  IoLeafSharp,        
} from 'react-icons/io5';
import { PosContext } from '../context/poscontext.jsx'

const Category = () => {
  const {
    error,
    loading,
    categories,
    selectedCategory,
    setSelectedCategory,
  } = useContext(PosContext)

  const categoryIcons = {
    'Alcohol': IoBeerSharp,
    'Breakfast': IoFastFoodSharp,
    'Burgers Sandwiches': IoPizzaSharp,
    'Cocktails': IoWineSharp,
    'Comfort Food': IoWineSharp, 
    'Desserts': IoIceCreamSharp,
    'Drinks': IoBeerSharp, 
    'Entrees': IoRestaurantSharp,
    'Fresh Food Bar': IoRestaurantSharp,
    'Kid\'s Menu': IoRestaurantSharp,
    'Misc.': IoRestaurantSharp, 
    'Salads': IoLeafSharp,
    'Sides': IoRestaurantSharp,
  };

  const categoryClicked = (category) => {
    setSelectedCategory(category)
  }

  return (
    <Col
      style={{
        padding: '0',
        top: '65px',
        position: 'sticky',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#121B28',
      }}
      md={2}
    >
      <div
        className="sidebar"
        style={{ padding: '20px', borderRight: '1px solid #2c2f36' }}
      >
        <ListGroup>
          <ListGroup.Item
            id="all001"
            className={`mb-2 shadow-sm ${
              selectedCategory === 'All' ? 'active' : ''
            }`}
            action
            onClick={() => categoryClicked('All')}
            style={{
              backgroundColor:
                selectedCategory === 'All' ? '#5fe3b3' : '#121B28',
              color: selectedCategory === 'All' ? '#121B28' : '#ffffff',
              border: `1px solid ${
                selectedCategory === 'All' ? '#5fe3b3' : '#121B28'
              }`,
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease, color 0.2s ease',
              fontFamily: 'Helvetica, Arial, sans-serif',
              padding: '0px 10px',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                display: 'inline-block',
                marginRight: '10px',
              }}
            >
              <IoFastFoodSharp />
            </div>
            <div
              style={{
                fontSize: '15px',
                display: 'inline-block',
              }}
            >
              All Products
            </div>
          </ListGroup.Item>
        </ListGroup>
        {categories &&
          categories.map((item) => {
            const Icon = categoryIcons[item.subType] || IoFastFoodSharp
            return (
              <ListGroup key={item.id}>
                <ListGroup.Item
                  id={`key${item.id}`}
                  className={`mb-2 shadow-sm ${
                    selectedCategory === item.subType ? 'active' : ''
                  }`}
                  action
                  onClick={() => categoryClicked(item.subType)}
                  style={{
                    backgroundColor:
                      selectedCategory === item.subType ? '#5fe3b3' : '#121B28',
                    color:
                      selectedCategory === item.subType ? '#121B28' : '#ffffff',
                    border: `1px solid ${
                      selectedCategory === item.subType ? '#5fe3b3' : '#121B28'
                    }`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease, color 0.2s ease',
                    fontFamily: 'Helvetica, Arial, sans-serif',
                    padding: '0px 10px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '24px',
                      display: 'inline-block',
                      marginRight: '10px',
                    }}
                  >
                    <Icon />
                  </div>
                  <div
                    style={{
                      fontSize: '15px',
                      display: 'inline-block',
                    }}
                  >
                    {item.subType}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            )
          })}
      </div>
    </Col>
  )
}

export default Category
