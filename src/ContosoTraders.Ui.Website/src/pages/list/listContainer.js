import React, { Fragment } from 'react';
// import { withRouter } from 'react-router-dom';
import LoadingSpinner from '../../components/loadingSpinner/loadingSpinner';
import './list.scss'
import List from './list';
import { ProductService } from '../../services';
import { useParams } from 'react-router-dom';
// class ListContainer extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     typesList: [],
  //     brandsList: [],
  //     productsList: [],
  //     queryString: '',
  //     loading: true,
  //   };

  //   this.queryString = [
  //     {
  //       brand: [],
  //       type: [],
  //     },
  //   ];
  //   this.type = [];
  //   this.brand = [];
  // }

  
  const brand = []
  function ListContainer() {
    const [typesList, setTypesList] = React.useState([]);
    const [brandsList, setBrandsList] = React.useState([]);
    const [productsList, setProductsList] = React.useState('');
    const queryString = 
      {
        brand: brand,
        type: '',
      }
    ;
    const [loading, setLoading] = React.useState(true);
    const [getType, setType] = React.useState([]);
    // const type = []
    const { code } = useParams(); 
    // React.useEffect(() => {
    //   const filter = code || '';
    //   getProductData(code);
    //   // setPageState(filteredProductsPageData);
    // }, []);
  
    React.useEffect(() => {
        getProductData(code);
    }, [code]);// eslint-disable-line react-hooks/exhaustive-deps

  
    const getProductData = async(type) => {
      setType(type)
      const filter = type === '' ? {} : (queryString.type = { type });
      const filteredProductsPageData = await ProductService.getFilteredProducts(filter);
      setPageState(filteredProductsPageData.data)
      // return filteredProductsPageData.data;
    }
  
    const setPageState = (filteredProductsPageData) => {
      if (filteredProductsPageData === undefined) {
        return;
      }
      const typesList = filteredProductsPageData.types;
      const brandsList = filteredProductsPageData.brands;
      const productsList = filteredProductsPageData.products;
      // this.setState({ productsList, typesList, brandsList, loading: false });
      setTypesList(typesList);
      setBrandsList(brandsList);
      setProductsList(productsList);
      setLoading(false);
    }
  
     const onFilterChecked = async (e, value) => {
          const isChecked = e.target.checked;
          const dataType = e.target.getAttribute('id');
          setQueryStringState(isChecked, dataType, value);
  
          const apiCall = await ProductService.getFilteredProducts(queryString);
          // setState({ productsList: apiCall.data.products });
          setProductsList(apiCall.data.products)
    };
  
    const setQueryStringState = (isChecked, dataType, value) => {
      if (isChecked) {
        brand.push(dataType);
        queryString.brand = brand;
        queryString.type = getType ? getType  : '';
        queryString.type = queryString.type.type === undefined ?
              queryString.type : queryString.type.type;
      } else {
        let index = queryString[value].indexOf(dataType);
        if (index !== -1) {
          queryString[value].splice(index, 1);
        }
        queryString.type = getType ? getType  : '';
      }
    }
    return (
      <Fragment>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <List
            onFilterChecked={onFilterChecked}
            typesList={typesList}
            brandsList={brandsList}
            productsList={productsList}
          />
        )}
      </Fragment>
    );
  }
// }

export default (ListContainer);
