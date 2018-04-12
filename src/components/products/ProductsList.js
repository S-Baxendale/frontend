import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { Link } from 'react-router-dom'
import compose from 'lodash/fp/compose'
import {translate, Trans} from "react-i18next"


import { fetchAllProducts } from '../../actions/products'


const styles = {
  card: {
    maxWidth: 345,
    minWidth: 240,
    margin: 20,
    textAlign: "left",
    display: "inline-block"
  },
  table: {
    width: "10px",
    fontSize: "10px"
  },
  number: {
    fontSize: "10px"
  },
  media: {
    height: 100,
  },
};




class ProductList extends PureComponent {
  static propTypes = {
  classes: PropTypes.object.isRequired
  };

  componentDidMount(props) {
    this.props.fetchAllProducts()
  }

  render() {
    const { classes, products } = this.props;

    const { t, i18n } = this.props
    {/* specific for translation */}


    return (
      <div>
        { products.map(product =>
         <Card className={classes.card}>
           <CardMedia
            className={classes.media}
            image={ product.photo }
            title="product name - redux"
          />
           <CardContent>
             <p className={classes.number}>
               {t('Order')} #{ product.name }
             </p>

               <table>

                 <tr className={classes.table}>
                    <th>{t('Product ID')}</th>
                    <td>{product.id}</td>
                 </tr>

                 <tr className={classes.table}>
                    <th>{t('Order Volume')}</th>
                    <td>{product.volume}</td>
                 </tr>

                 <tr className={classes.table}>
                    <th>{t('Price')}</th>
                    <td>{product.price}</td>
                 </tr>

                 <tr className={classes.table}>
                    <th>{t('Status')}</th>
                    <td>{product.description}</td>
                 </tr>


               </table>

           </CardContent>
           <CardActions>

            <Link to={ `/products/${product.id}` }>
             <Button size="small" color="primary">
               {t('View Product')}
             </Button>
             </Link>
           </CardActions>
         </Card>
         )}
       </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default compose(
  translate('orders'),
  withStyles(styles),
  connect(mapStateToProps, { fetchAllProducts }))(ProductList);
